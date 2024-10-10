import { RegistryPlug } from '@action/registry';
import { getERC20SymbolAndDecimals } from '@core/utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import BigNumber from 'bignumber.js';
import {
  Interface,
  JsonRpcProvider,
  dataSlice,
  ethers,
  formatEther,
  formatUnits,
  getAddress,
  getBigInt,
  id,
  keccak256,
  parseUnits,
  toBigInt,
  toUtf8Bytes,
} from 'ethers';
import {
  Action as ActionDto,
  BasicAdditionalParams,
  GenerateFormParams,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';
import { Address, ErrorMessage } from 'src/types';
import { utils } from 'zksync-ethers';

import ERC20ABI from './abis/ERC20.json';
import QuoterV2 from './abis/QuoterV2.json';
import RedPacketABI from './abis/RedPacket.json';
import {
  TransactionResult,
  Value,
  browserConfig,
  configuration,
  feeMap,
  providerConfig,
} from './config';
import { genMetadata } from './metadata';
import {
  ClaimRedPacketParams,
  CreateRedPacketParams,
  DistributionModeValue,
  DistributionTokenValue,
  FieldTypes,
  GasTokenValue,
} from './type';
import { DataService } from '../../data/src/data.service';

const PACKET_HASH = ethers.keccak256(ethers.toUtf8Bytes('REDPACKET'));

@RegistryPlug('red-envelope', 'v1')
@Injectable()
export class RedEnvelopeService extends ActionDto<FieldTypes> {
  private readonly logger = new Logger(RedEnvelopeService.name);
  public envelopContract: ethers.Contract;
  private quoter: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  readonly env: ConfigType['env'];
  readonly witnessPrivateKey: ConfigType['witnessPrivateKey'];
  readonly config: Value;

  constructor(
    readonly configService: ConfigService,
    private readonly dataService: DataService,
  ) {
    super();
    this.env = configService.get('env', { infer: true })!;
    this.witnessPrivateKey = configService.get('witnessPrivateKey', {
      infer: true,
    })!;
    this.config = configuration[this.env];
    this.provider = new JsonRpcProvider(this.config.rpcUrl);
    const mainNetProvider = new JsonRpcProvider('https://rpc.zklink.io');

    this.wallet = new ethers.Wallet(this.witnessPrivateKey, this.provider);
    const mainWallet = new ethers.Wallet(
      this.witnessPrivateKey,
      mainNetProvider,
    );
    this.envelopContract = new ethers.Contract(
      this.config.redPacketContractAddress,
      RedPacketABI,
      this.wallet,
    );
    this.quoter = new ethers.Contract(
      this.config.quoterContractAddress,
      QuoterV2,
      mainWallet,
    );
  }

  public async getMetadata() {
    return genMetadata(this.config);
  }

  private async genCreateSignature(params: CreateRedPacketParams) {
    const domain = {
      name: 'RedPacket',
      version: '0',
      chainId: this.config.chainId,
      verifyingContract: this.config.redPacketContractAddress,
    };

    const types = {
      CreateRedPacket: [
        { name: 'creator', type: 'address' },
        { name: 'token', type: 'address' },
        { name: 'totalCount', type: 'uint256' },
        { name: 'tokenAmount', type: 'uint256' },
        { name: 'payForGas', type: 'uint256' },
        { name: 'totalShare', type: 'uint256' },
        { name: 'packetHash', type: 'bytes32' },
        { name: 'isRandom', type: 'bool' },
        { name: 'isGasfree', type: 'bool' },
        { name: 'expiry', type: 'uint256' },
      ],
    };

    const signMessage = {
      creator: params.creator,
      token: params.token,
      totalCount: params.totalCount,
      tokenAmount: params.tokenAmount,
      payForGas: params.payForGas,
      totalShare: params.totalShare,
      packetHash: params.packetHash,
      isRandom: params.isRandom,
      isGasfree: params.isGasfree,
      expiry: params.expiry,
    };
    const signature = await this.wallet.signTypedData(
      domain,
      types,
      signMessage,
    );

    return signature;
  }

  private async genClaimSignature(params: ClaimRedPacketParams) {
    const domain = {
      name: 'RedPacket',
      version: '0',
      chainId: this.config.chainId,
      verifyingContract: this.config.redPacketContractAddress,
    };

    const types = {
      RedPacketClaim: [
        { name: 'id', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'expiry', type: 'uint256' },
      ],
    };

    const signMessage = {
      id: params.id,
      recipient: params.recipient,
      expiry: params.expiry,
    };

    const signature = await this.wallet.signTypedData(
      domain,
      types,
      signMessage,
    );

    return signature;
  }

  private async claimRedEnvelopeMinGas(
    formData: GenerateFormParams<FieldTypes>,
  ) {
    const { gasToken, amountOfRedEnvelopes } = formData;
    const isGasfree = gasToken === GasTokenValue.DistributedToken;
    const id = 0n;
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = await this.genClaimSignature({
      id,
      expiry,
      recipient: this.wallet.address,
    });

    const gasEstimate = await this.envelopContract.claimRedPacket.estimateGas(
      id,
      expiry,
      signature,
    );
    const { maxFeePerGas } = await this.provider.getFeeData();
    const _txCost = BigNumber((gasEstimate * (maxFeePerGas ?? 0n)).toString())
      .multipliedBy(1.5)
      .multipliedBy(amountOfRedEnvelopes);

    const payForGas = isGasfree
      ? 0n // await this.getQuote(distributionToken, BigInt(txCost.toString())) TODO
      : 0n;
    return payForGas;
  }

  private async getQuote(tokenOut: string, ethAmountIn: bigint) {
    const replacedTokenOut =
      tokenOut === DistributionTokenValue.DTN
        ? DistributionTokenValue.ZKL
        : tokenOut;
    const fee = feeMap[replacedTokenOut];

    try {
      const [amountOut] = await this.quoter.quoteExactInputSingle.staticCall({
        tokenIn: this.config.wethAddress,
        tokenOut: replacedTokenOut,
        amountIn: ethAmountIn,
        fee: fee,
        sqrtPriceLimitX96: 0,
      });
      return amountOut;
    } catch (error) {
      throw new Error(`Error fetching quote:, ${error.message}`);
    }
  }

  private genTotalShare(count: number): number {
    const abiCoder = new ethers.AbiCoder();
    let newHash = PACKET_HASH;
    let totalShare = 0;
    for (let i = 0; i < count; i++) {
      newHash = ethers.keccak256(abiCoder.encode(['bytes32'], [newHash]));
      const newHashBigInt = BigInt(newHash);
      const share = Number(newHashBigInt % 10n) + 1;
      totalShare += share;
    }
    return totalShare;
  }

  private async getDecimals(tokenAddress: string): Promise<bigint> {
    if (tokenAddress === DistributionTokenValue.ETH) {
      return 18n;
    }
    const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.provider);
    const decimals = await contract.decimals();
    return decimals;
  }

  private getPacketIDByCode(code: string) {
    const hash = keccak256(toUtf8Bytes(code));
    const id = getBigInt(hash);
    return id;
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { code, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }
    const id = this.getPacketIDByCode(code);
    const {
      distributionMode,
      totalDistributionAmount,
      distributionToken,
      amountOfRedEnvelopes,
      gasToken,
    } = formData;

    const totalShare = this.genTotalShare(parseInt(amountOfRedEnvelopes));
    const packetHash = PACKET_HASH;
    const isRandom =
      distributionMode === DistributionModeValue.RandomAmountPerAddress;
    const isGasfree = gasToken === GasTokenValue.DistributedToken;
    const payForGas = await this.claimRedEnvelopeMinGas(formData);

    const decimals = await this.getDecimals(distributionToken);
    const totalDistributionAmountBn = parseUnits(
      totalDistributionAmount,
      decimals,
    );
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;

    const signature = await this.genCreateSignature({
      creator: account as Address,
      token: distributionToken as Address,
      totalCount: parseInt(amountOfRedEnvelopes),
      tokenAmount: totalDistributionAmountBn,
      payForGas: payForGas,
      totalShare: totalShare,
      packetHash: packetHash,
      isRandom: isRandom,
      isGasfree: isGasfree,
      expiry: expiry,
    });

    const totalValue = totalDistributionAmountBn + payForGas;

    const createRedPacketData =
      await this.envelopContract.createRedPacket.populateTransaction(
        id,
        distributionToken,
        amountOfRedEnvelopes,
        totalDistributionAmountBn,
        payForGas,
        totalShare,
        packetHash,
        isRandom,
        isGasfree,
        expiry,
        signature,
      );

    const transactions = [];

    if (distributionToken !== DistributionTokenValue.ETH) {
      const tokenContract = new ethers.Contract(
        distributionToken,
        ERC20ABI,
        this.provider,
      );
      const allowance = await tokenContract.allowance(
        additionalData.account,
        this.config.redPacketContractAddress,
      );
      if (totalValue > allowance) {
        const approveData = await tokenContract.approve.populateTransaction(
          this.config.redPacketContractAddress,
          totalValue,
        );
        transactions.push({
          chainId: this.config.chainId,
          to: approveData.to,
          value: '0',
          data: approveData.data,
          shouldPublishToChain: true,
        });
      }
    }

    transactions.push({
      chainId: this.config.chainId,
      to: createRedPacketData.to,
      value:
        DistributionTokenValue.ETH === distributionToken
          ? totalValue.toString()
          : '0',
      data: createRedPacketData.data,
      shouldPublishToChain: true,
    });

    return transactions;
  }

  public async preCheckTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ) {
    const { additionalData } = data;
    const { code, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }
    const packetId = this.getPacketIDByCode(code);
    const hasClaimed = await this.envelopContract.isClaimed(packetId, account);
    if (hasClaimed) {
      return 'User has already received';
    } else {
      return '';
    }
  }

  getTokenNameByAddress(address: string): string | undefined {
    const entries = Object.entries(DistributionTokenValue) as [
      string,
      string,
    ][];
    const foundEntry = entries.find(([_, value]) => value === address);
    return foundEntry ? foundEntry[0] : undefined;
  }

  async reportTransaction(
    data: GenerateTransactionParams<FieldTypes>,
    txHash: string,
  ): Promise<ErrorMessage> {
    const { formData } = data;
    const { distributionToken } = formData;
    const iface = new Interface(RedPacketABI);
    const eventTopic = ethers.id('RedPacketClaimed(uint256,address,uint256)');
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        throw new Error('wrong transaction hash');
      }
      const log = receipt.logs.find((log) => {
        return log.topics[0] === eventTopic;
      });
      if (!log) {
        throw new Error('parse log error');
      }
      const event = iface.parseLog(log);
      const { amount } = event?.args ?? { amount: 0n };
      const decimals = await this.getDecimals(distributionToken);
      const symbol = this.getTokenNameByAddress(distributionToken);
      const claimedAmount = formatUnits(amount.toString(), decimals);
      return `You have received ${claimedAmount} ${symbol} in red packet amount!`;
    } catch (error) {
      throw new Error(`Failed to fetch transaction receipt: ${error.message}`);
    }
  }

  public async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { gasToken } = formData;
    const isGasfree = gasToken === GasTokenValue.DistributedToken;
    const { code, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }

    if (!account) {
      throw new Error('missing account');
    }

    const paymasterParams = utils.getPaymasterParams(
      this.config.paymasterContractAddress,
      {
        type: 'General',
        innerInput: new Uint8Array(),
      },
    );
    const packetId = this.getPacketIDByCode(code);
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = await this.genClaimSignature({
      id: packetId,
      expiry,
      recipient: account,
    });
    const tx = await this.envelopContract.claimRedPacket.populateTransaction(
      packetId,
      expiry,
      signature,
    );
    return [
      {
        chainId: this.config.chainId,
        to: this.config.redPacketContractAddress,
        value: '0',
        data: tx.data,
        customData: isGasfree
          ? {
              gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
              paymasterParams,
            }
          : null,
        shouldPublishToChain: true,
      },
    ];
  }

  private async getTxRecords(code: string) {
    const result = await this.dataService.findListByCode(code);
    if (!result) {
      return [];
    }
    const transferInfos: TransactionResult[] = [];
    const intentionRecordTxs: IntentionRecordTx[] = result.intentionRecordTxs;
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
    return transferInfos;
  }

  public async reloadAdvancedInfo(
    data: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    const { code } = data;
    if (!code) {
      throw new Error('missing code');
    }
    const hash = keccak256(toUtf8Bytes(code));
    const packetId = getBigInt(hash);
    const [, unClaimedCount] =
      await this.envelopContract.getRedPacketBalance(packetId);
    const [_, , , totalCount] =
      await this.envelopContract.getRedPacketInfo(packetId);

    const getTxRecords = await this.getTxRecords(code);
    return {
      title: 'Recipients',
      content:
        `${totalCount - unClaimedCount}/${totalCount} red packet(s) opened` +
        (await this.generateHTML(getTxRecords)),
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
    return transactions
      .map((tx) => {
        const option = this.config.tokens.find(
          (option) => option.value === tx.tokenAddress,
        );
        const browserUrl = browserConfig[tx.chainId];
        const tokenName = option?.label;
        const prefixedTxhash = `${browserUrl}${tx.txhash}`;
        return `
          <br/>
          <br/>
          <div>
            <div>To: ${tx.toAddress} </div>
            <div>Amount: ${tx.value} ${tokenName}</div>
            <div>Transaction Hash: <a href=${prefixedTxhash}>${prefixedTxhash}</a><div>
          </div>
        `;
      })
      .join('');
  }

  public async generateManagementInfo(code: string) {
    const packetId = this.getPacketIDByCode(code);
    const magicLinkInfo = await this.dataService.getMagicLinkInfoByCode(code);

    if (!magicLinkInfo) {
      throw new Error(`magic link ${code} not found`);
    }
    const distributionToken = magicLinkInfo.components.find(
      (i) => i.name === 'distributionToken',
    );

    if (!distributionToken) {
      throw new Error(`magic link ${code} distributionToken not found`);
    }

    let symbol = 'ETH';
    let decimals = 18;

    if (distributionToken.value !== ethers.ZeroAddress) {
      const tokenData = await getERC20SymbolAndDecimals(
        this.provider,
        distributionToken.value,
      );
      symbol = tokenData.symbol;
      decimals = tokenData.decimals;
    }

    const withdrawRedPacketData =
      await this.envelopContract.withdrawPacketBalance.populateTransaction(
        packetId,
      );

    const [, , , totalCount, tokenAmount] =
      await this.envelopContract.getRedPacketInfo(packetId);

    const [, unClaimedCount, unClaimedTokenAmount] =
      await this.envelopContract.getRedPacketBalance(packetId);

    const records = await this.getTxRecords(code);
    return {
      form: [
        {
          label: 'Number of Red Packets ',
          value: `${unClaimedCount}/${totalCount}`,
        },
        {
          label: 'Number of Tokens',
          value: `${formatUnits(unClaimedTokenAmount, decimals)}/${formatUnits(tokenAmount, decimals)} ${symbol}`,
        },
        {
          label: 'Winner List',
          value: records.map((i) => ({ address: i.toAddress, value: i.value })),
        },
      ],
      triggers: [
        {
          text: 'Claim your token',
          transactions: [
            {
              chainId: Number(magicLinkInfo.network.chainId),
              to: this.config.redPacketContractAddress,
              value: '0',
              data: withdrawRedPacketData.data,
              customData: null,
              shouldPublishToChain: true,
            },
          ],
        },
      ],
    };
  }
}
