import { RegistryPlug } from '@action/registry';
import { ChainService, DataService } from '@core/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Contract,
  dataSlice,
  formatEther,
  getAddress,
  id,
  parseUnits,
  toBigInt,
} from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  BasicAdditionalParams,
  GenerateTransactionParams,
  TransactionInfo,
  isOptionComponentDto,
} from 'src/common/dto';
import { Chains } from 'src/constants';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';

import ERC20ABI from './abis/ERC20.json';
import { FieldTypes, TransactionResult } from './types';

@RegistryPlug('split-bill', 'v1')
@Injectable()
export class SplitBillService extends ActionDto<FieldTypes> {
  private readonly logger = new Logger(SplitBillService.name);
  private readonly isDev: boolean;
  constructor(
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.isDev = this.configService.get('env')! === 'dev';
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    const supportedNetwork = [Chains.ArbitrumOne, Chains.ZkLinkNova];
    const supportedToken = [
      {
        label: 'ETH',
        value: '',
        chainId: Chains.ArbitrumOne,
      },
      {
        label: 'USDT',
        value: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        chainId: Chains.ArbitrumOne,
      },
      {
        label: 'USDC',
        value: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        chainId: Chains.ArbitrumOne,
        default: true,
      },
      {
        label: 'ETH',
        value: '',
        chainId: Chains.ZkLinkNova,
      },
      {
        label: 'USDT',
        value: '0x2F8A25ac62179B31D62D7F80884AE57464699059',
        chainId: Chains.ZkLinkNova,
      },
      {
        label: 'USDC',
        value: '0x1a1A3b2ff016332e866787B311fcB63928464509',
        chainId: Chains.ZkLinkNova,
        default: true,
      },
    ];
    if (this.isDev) {
      supportedNetwork.push(Chains.ZkLinkNovaSepolia, Chains.ZklinkDev);
      supportedToken.push(
        {
          label: 'ETH',
          value: '',
          chainId: Chains.ZkLinkNovaSepolia,
        },
        {
          label: 'USDT',
          value: '0x0efDC9f3948BE4509e8c57d49Df97660CF038F9a',
          chainId: Chains.ZkLinkNovaSepolia,
        },
        {
          label: 'USDC',
          value: '0xAC4a95747cB3f291BC4a26630862FfA0A4b01B44',
          chainId: Chains.ZkLinkNovaSepolia,
          default: true,
        },
        {
          label: 'ETH',
          value: '',
          chainId: Chains.ZklinkDev,
        },
        {
          label: 'USDT',
          value: '0xDBBD57f02DdbC9f1e2B80D8DAcfEC34BC8B287e3',
          chainId: Chains.ZklinkDev,
        },
        {
          label: 'USDC',
          value: '0x09B141F8a41BA6d2A0Ec1d55d67De3C8f3846921',
          chainId: Chains.ZklinkDev,
          default: true,
        },
      );
    }
    return {
      title: 'Split Bill 💰',
      description:
        '<div>This action is made for friends to split the bill</div>',
      networks: this.chainService.buildSupportedNetworks(supportedNetwork),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {
        title: 'Split Bill 💰',
        description: 'Each friend will pay you the same amount',
      },
      intent: {
        binding: 'value',
        components: [
          {
            name: 'token',
            label: 'Token',
            desc: 'The token you want to cost',
            type: 'searchSelect',
            options: supportedToken,
          },
          {
            name: 'value',
            label: 'Amount',
            desc: 'The amount of tokens you receive from each friend.',
            type: 'input',
            regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
            defaultValue: '10',
            regexDesc: 'Must be a number',
          },
          {
            name: 'recipient',
            label: 'Recipient',
            desc: "Please enter the recipient's address.",
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid Address',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId } = additionalData;
    const provider = this.chainService.getProvider(chainId);
    let transferTx = { to: formData.recipient, data: '0x' };
    if (formData.token !== '') {
      const contract = new Contract(
        formData.token.toString(),
        ERC20ABI,
        provider,
      );
      const decimals = await contract.decimals();
      const amountToSend = parseUnits(formData.value.toString(), decimals);
      transferTx = await contract.transfer.populateTransaction(
        formData.recipient,
        amountToSend,
      );
    }

    const tx: TransactionInfo = {
      chainId: chainId,
      to: transferTx.to,
      value:
        formData.token === ''
          ? parseUnits(formData.value.toString(), 18).toString()
          : '0',
      data: transferTx.data,
      shouldPublishToChain: true,
    };
    return [tx];
  }

  public async reloadAdvancedInfo(
    data: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    const { code } = data;
    if (!code) {
      throw new Error('missing code');
    }
    const result = await this.dataService.findRecordByCode(code);
    const transferInfos: TransactionResult[] = [];
    if (!result) {
      return {
        title: 'Paid Frens',
        content: await this.generateHTML(transferInfos),
      };
    }

    const intentionRecordTxs: IntentionRecordTx[] = result
      .map((r) => r.intentionRecordTxs)
      .flat();
    for (const recordTx of intentionRecordTxs) {
      if (recordTx.status !== IntentionRecordTxStatus.SUCCESS) {
        continue;
      }
      const transferInfo: TransactionResult = await this.parseTransaction(
        recordTx.txHash,
        recordTx.chainId,
      );
      transferInfos.push(transferInfo);
    }

    return {
      title: 'Paid Frens',
      content: await this.generateHTML(transferInfos),
    };
  }

  public async parseTransaction(txhash: string, chainId: number) {
    const transferEventHash = id('Transfer(address,address,uint256)');
    const provider = this.chainService.getProvider(chainId);

    const receipt = await provider.getTransactionReceipt(txhash);
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }

    let toAddress: string;
    let tokenAddress: string;
    let value: bigint;

    for (const log of receipt.logs) {
      if (log.topics[0] === transferEventHash) {
        if (log.address === '0x000000000000000000000000000000000000800A') {
          continue;
        }
        const from = getAddress(dataSlice(log.topics[1], 12));
        const to = getAddress(dataSlice(log.topics[2], 12));
        value = toBigInt(log.data);
        tokenAddress = log.address;
        toAddress = to;
        this.logger.log(
          `ERC-20 Transfer: from ${from} to ${to}, amount ${formatEther(value.toString())} tokens at ${tokenAddress}`,
        );
        return {
          toAddress,
          tokenAddress,
          value: formatEther(value.toString()),
          txhash,
          chainId,
        } as TransactionResult;
      }
    }
    // If no ERC-20 transfer event was found, check if it's an ETH transfer
    const tx = await provider.getTransaction(txhash);
    if (tx) {
      toAddress = tx.to || '';
      const ethValue = tx.value.toString();
      this.logger.log(
        `ETH Transfer: from ${tx.from} to ${tx.to}, amount ${formatEther(ethValue)} ETH`,
      );
      return {
        toAddress,
        tokenAddress: '',
        value: formatEther(ethValue),
        txhash,
        chainId,
      } as TransactionResult;
    }

    throw new Error('Transaction parsing failed');
  }

  public async generateHTML(
    transactions: TransactionResult[],
  ): Promise<string> {
    const metadata = await this.getMetadata();
    return transactions
      .map((tx) => {
        const tokenComponent = metadata.intent.components.find(
          (component) => component.name === 'token',
        );
        if (!tokenComponent) {
          throw new Error('Missing token component');
        }
        if (isOptionComponentDto(tokenComponent)) {
          const option = tokenComponent?.options?.find(
            (option) =>
              option.value === tx.tokenAddress && option.chainId === tx.chainId,
          );
          const tokenName = option?.label;
          const prefixedTxhash = this.chainService.buildTransactionExplorerLink(
            tx.txhash,
            tx.chainId,
          );
          return `<p>${tx.toAddress}   ${tx.value} ${tokenName}   ${prefixedTxhash}</p>`;
        }
      })
      .join('');
  }
}
