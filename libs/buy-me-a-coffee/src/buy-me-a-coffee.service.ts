import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import {
  Contract,
  JsonRpcProvider,
  dataSlice,
  formatEther,
  getAddress,
  id,
  parseUnits,
  toBigInt,
} from 'ethers';
import {
  Action as ActionDto,
  BasicAdditionalParams,
  GenerateTransactionParams,
  TransactionInfo,
  isOptionComponentDto,
} from 'src/common/dto';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';
import { IntentionRecordService } from 'src/modules/actionUrl/intentionRecord.service';

import ERC20ABI from './abis/ERC20.json';
import {
  TransactionResult,
  browserConfig,
  metadata,
  providerConfig,
} from './config';
import { FieldTypes } from './types';

@RegistryPlug('buy-me-a-coffee', 'v1')
@Injectable()
export class BuyMeACoffeeService extends ActionDto<FieldTypes> {
  constructor(private readonly intentionRecordService: IntentionRecordService) {
    super();
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId } = additionalData;
    const providerUrl = providerConfig[chainId];
    const provider = new JsonRpcProvider(providerUrl);
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
      throw new Error('missing code in buy me a coffee');
    }
    const result = await this.intentionRecordService.findListByCode(code, '');
    const transferInfos: TransactionResult[] = [];

    for (const item of result.data) {
      const intentionRecordTxs: IntentionRecordTx[] = item.intentionRecordTxs;
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
    }

    return {
      title: 'Donations',
      content: await this.generateHTML(transferInfos),
    };
  }

  public async parseTransaction(txhash: string, chainId: number) {
    const transferEventHash = id('Transfer(address,address,uint256)');
    const providerUrl = providerConfig[chainId];
    const provider = new JsonRpcProvider(providerUrl);

    const receipt = await provider.getTransactionReceipt(txhash);
    if (!receipt) {
      throw new Error('Transaction receipt not found');
    }

    let toAddress: string;
    let tokenAddress: string;
    let value: bigint;

    for (const log of receipt.logs) {
      console.log(log);
      if (log.topics[0] === transferEventHash) {
        if (log.address === '0x000000000000000000000000000000000000800A') {
          continue;
        }
        const from = getAddress(dataSlice(log.topics[1], 12));
        const to = getAddress(dataSlice(log.topics[2], 12));
        value = toBigInt(log.data);
        tokenAddress = log.address;
        toAddress = to;
        console.log(
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
      console.log(
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
    return transactions
      .map((tx) => {
        const tokenComponent = metadata.intent.components.find(
          (component) => component.name === 'token',
        );
        if (isOptionComponentDto(tokenComponent)) {
          const option = tokenComponent.options.find(
            (option) =>
              option.value === tx.tokenAddress &&
              option.chainId === tx.chainId.toString(),
          );
          const browserUrl = browserConfig[tx.chainId];
          const tokenName = option?.label;
          const prefixedTxhash = `${browserUrl}${tx.txhash}`;
          return `<p>${tx.toAddress}   ${tx.value} ${tokenName}   ${prefixedTxhash}</p>`;
        }
      })
      .join('');
  }
}
