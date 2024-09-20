import { Injectable } from '@nestjs/common';
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
import { utils } from 'zksync-ethers';

import { RegistryPlug } from '@action/registry';
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
import { IntentionRecordService } from 'src/modules/actionUrl/intentionRecord.service';
import { Address } from 'src/types';

import ERC20ABI from './abis/ERC20.json';
import MemeRedPacketABI from './abis/MemeRedPacket.json';
import QuoterV2 from './abis/QuoterV2.json';
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

const PACKET_HASH = ethers.keccak256(ethers.toUtf8Bytes('REDPACKET'));

@RegistryPlug('shared-red-packet', 'v1')
@Injectable()
export class SharedRedPacketService extends ActionDto<FieldTypes> {
  public redPacketContract: ethers.Contract;
  private quoter: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  readonly env: ConfigType['env'];
  readonly witnessPrivateKey: ConfigType['witnessPrivateKey'];
  readonly config: Value;

  constructor(
    readonly configService: ConfigService,
    private readonly intentionRecordService: IntentionRecordService,
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
    this.redPacketContract = new ethers.Contract(
      this.config.redPacketContractAddress,
      MemeRedPacketABI,
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
        { name: 'totalShare', type: 'uint256' },
        { name: 'packetHash', type: 'bytes32' },
        { name: 'isRandom', type: 'bool' },
        // { name: 'isGasfree', type: 'bool' },
        { name: 'isInvitable', type: 'bool' },
        { name: 'expiry', type: 'uint256' },
      ],
    };

    const signMessage = {
      creator: params.creator,
      token: params.token,
      totalCount: params.totalCount,
      tokenAmount: params.tokenAmount,
      // payForGas: params.payForGas,
      totalShare: params.totalShare,
      packetHash: params.packetHash,
      isRandom: params.isRandom,
      // isGasfree: params.isGasfree,
      isInvitable: params.isInvitable,
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
      isInvitable,
    } = formData;

    const totalShare = this.genTotalShare(parseInt(amountOfRedEnvelopes));
    const packetHash = PACKET_HASH;
    const isRandom =
      distributionMode === DistributionModeValue.RandomAmountPerAddress;
    const isGasfree = gasToken === GasTokenValue.DistributedToken;

    const decimals = await this.getDecimals(distributionToken);
    const totalDistributionAmountBn = parseUnits(
      totalDistributionAmount,
      decimals,
    );
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;

    const tokenContract = new ethers.Contract(
      distributionToken,
      ERC20ABI,
      this.provider,
    );
    const approveData = await tokenContract.approve.populateTransaction(
      this.config.redPacketContractAddress,
      totalDistributionAmountBn,
    );

    const allowance = await tokenContract.allowance(
      additionalData.account,
      this.config.redPacketContractAddress,
    );

    const signature = await this.genCreateSignature({
      creator: account as Address,
      token: distributionToken as Address,
      totalCount: parseInt(amountOfRedEnvelopes),
      tokenAmount: totalDistributionAmountBn,
      // payForGas: payForGas,
      totalShare: totalShare,
      packetHash: packetHash,
      isRandom: isRandom,
      isInvitable: isInvitable,
      expiry: expiry,
    });

    const createRedPacketData =
      await this.redPacketContract.createRedPacket.populateTransaction(
        id,
        distributionToken,
        amountOfRedEnvelopes,
        totalDistributionAmountBn,
        // payForGas,
        totalShare,
        packetHash,
        isRandom,
        isGasfree,
        isInvitable,
        expiry,
        signature,
      );

    const transactions = [];
    if (totalDistributionAmountBn > allowance) {
      transactions.push({
        chainId: this.config.chainId,
        to: approveData.to,
        value: '0',
        data: approveData.data,
        shouldPublishToChain: true,
      });
    }

    transactions.push({
      chainId: this.config.chainId,
      to: createRedPacketData.to,
      value: '0',
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
    const hasClaimed = await this.redPacketContract.isClaimed(
      packetId,
      account,
    );
    if (hasClaimed) {
      return { enable: false, reason: 'User has already received' };
    } else {
      return { enable: true };
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
  ): Promise<{ message: string }> {
    const { formData } = data;
    const { distributionToken } = formData;
    const iface = new Interface(MemeRedPacketABI);
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
      return {
        message: `You have received ${claimedAmount} ${symbol} in red packet amount!`,
      };
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
    const { code, account, inviter } = additionalData;
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
    const tx = await this.redPacketContract.claimRedPacket.populateTransaction(
      packetId,
      inviter,
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

  public async reloadAdvancedInfo(
    data: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    const { code } = data;
    if (!code) {
      throw new Error('missing code');
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

    const hash = keccak256(toUtf8Bytes(code));
    const packetId = getBigInt(hash);
    const [, unClaimedCount] =
      await this.redPacketContract.getRedPacketBalance(packetId);
    const [_, , , totalCount] =
      await this.redPacketContract.getRedPacketInfo(packetId);
    return {
      title: 'Recipients',
      content:
        `${totalCount - unClaimedCount}/${totalCount} red packet(s) opened` +
        (await this.generateHTML(transferInfos)),
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
        const option = this.config.tokens.find(
          (option) => option.value === tx.tokenAddress,
        );
        const browserUrl = browserConfig[tx.chainId];
        const tokenName = option?.label;
        const prefixedTxhash = `${browserUrl}${tx.txhash}`;
        return `<p>${tx.toAddress}   ${tx.value} ${tokenName}   ${prefixedTxhash}</p>`;
      })
      .join('');
  }
}
