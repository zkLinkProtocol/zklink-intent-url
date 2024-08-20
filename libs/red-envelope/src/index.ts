import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  JsonRpcProvider,
  ethers,
  getBigInt,
  keccak256,
  parseUnits,
  toUtf8Bytes,
} from 'ethers';
import { ConfigType } from 'src/config';
import { utils } from 'zksync-ethers';

import ERC20ABI from './abis/ERC20.json';
import QuoterV2 from './abis/QuoterV2.json';
import RedPacketABI from './abis/RedPacket.json';
import { Value, config } from './config';
import { genMetadata } from './metadata';
import { DistributionModeValue, GasTokenValue } from './type';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from '../../../src/common/dto';

const PACKET_HASH = ethers.keccak256(ethers.toUtf8Bytes('REDPACKET'));

interface CreateRedPacketParams {
  creator: string;
  token: string;
  totalCount: number;
  tokenAmount: bigint;
  payForGas: bigint;
  totalShare: number;
  packetHash: string;
  isRandom: boolean;
  isGasfree: boolean;
  expiry: number;
}

interface ClaimRedPacketParams {
  id: string;
  recipient: string;
  expiry: number;
}

@Injectable()
export class RedEnvelopeService extends ActionDto {
  public envelopContract: ethers.Contract;
  private quoter: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  readonly env: ConfigType['env'];
  readonly witnessPrivateKey: ConfigType['witnessPrivateKey'];
  readonly config: Value;

  constructor(readonly configService: ConfigService) {
    super();
    this.env = configService.get('env', { infer: true })!;
    this.witnessPrivateKey = configService.get('witnessPrivateKey', {
      infer: true,
    })!;
    this.config = config[this.env];
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

  public async getMetadata(): Promise<ActionMetadata> {
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

  private async claimRedEnvelopeTxGas() {
    const id = '1';
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = this.genClaimSignature({
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
    const txCost = gasEstimate * (maxFeePerGas ?? 0n);
    return txCost;
  }

  private async getQuote(tokenOut: string, ethAmountIn: bigint) {
    const fee = 3000;
    console.log('todo', tokenOut);
    try {
      const [amountOut] = await this.quoter.quoteExactInputSingle.staticCall({
        tokenIn: this.config.wethAddress,
        tokenOut: '0xDa4AaEd3A53962c83B35697Cd138cc6df43aF71f', // todo tokenOut
        amountIn: ethAmountIn,
        fee: fee,
        sqrtPriceLimitX96: 0,
      });
      return amountOut;
    } catch (error) {
      console.error('Error fetching quote:', error);
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

  public async afterActionUrlCreated(data: {
    code: string;
    sender: string;
    params: any;
  }): Promise<GeneratedTransaction> {
    const { code, sender, params } = data;
    const hash = keccak256(toUtf8Bytes(code));
    const uint256Value = getBigInt(hash);
    const {
      distributionMode,
      totalDistributionAmount,
      distributionToken,
      amountOfRedEnvelopes,
      gasToken,
    } = params;

    const totalShare = this.genTotalShare(amountOfRedEnvelopes);
    const packetHash = PACKET_HASH;
    const isRandom =
      distributionMode === DistributionModeValue.RandomAmountPerAddress;
    const isGasfree = gasToken === GasTokenValue.DistributedToken;
    const txGas = await this.claimRedEnvelopeTxGas();
    const payForGas = isGasfree
      ? await this.getQuote(distributionToken, txGas)
      : 0n;
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
      totalDistributionAmountBn + payForGas,
    );

    const signature = await this.genCreateSignature({
      creator: sender,
      token: distributionToken,
      totalCount: amountOfRedEnvelopes,
      tokenAmount: totalDistributionAmountBn,
      payForGas: payForGas,
      totalShare: totalShare,
      packetHash: packetHash,
      isRandom: isRandom,
      isGasfree: isGasfree,
      expiry: expiry,
    });

    const createRedPacketData =
      await this.envelopContract.createRedPacket.populateTransaction(
        uint256Value,
        distributionToken,
        amountOfRedEnvelopes,
        totalDistributionAmount,
        payForGas,
        totalShare,
        packetHash,
        isRandom,
        isGasfree,
        expiry,
        signature,
      );

    return {
      txs: [
        {
          chainId: this.config.chainId,
          to: approveData.to,
          value: '0',
          data: approveData.data,
          dataObject: {},
          shouldSend: false,
        },
        {
          chainId: this.config.chainId,
          to: createRedPacketData.to,
          value: '0',
          data: createRedPacketData.data,
          dataObject: {},
          shouldSend: false,
        },
      ],
      tokens: [],
    };
  }

  public override async validateIntentParams(params: {
    [key in string]: string;
  }): Promise<any> {
    const { totalDistributionAmount, distributionToken, amountOfRedEnvelopes } =
      params;
    const txGas = await this.claimRedEnvelopeTxGas();
    const decimals = await this.getDecimals(distributionToken);

    if (
      txGas * BigInt(Number(amountOfRedEnvelopes) * 1.5) >=
      parseUnits(totalDistributionAmount, decimals)
    ) {
      return 'The amount of the pool is too low to cover gas fee';
    }

    if (Number(amountOfRedEnvelopes) > 100) {
      return 'A maximum of 100 red envelopes can be sent at one time';
    }
  }

  public async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { code, sender } = data;
    const paymasterParams = utils.getPaymasterParams(
      this.config.paymasterContractAddress,
      {
        type: 'General',
        innerInput: new Uint8Array(),
      },
    );
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = this.genClaimSignature({
      id: code,
      expiry,
      recipient: sender,
    });
    const tx = await this.envelopContract.claimRedPacket.populateTransaction(
      code,
      expiry,
      signature,
    );
    return {
      txs: [
        {
          chainId: this.config.chainId,
          to: this.config.redPacketContractAddress,
          value: '0',
          data: tx.data,
          dataObject: {},
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams,
          },
          shouldSend: false,
        },
      ],
      tokens: [],
    };
  }

  public async getRealTimeContent(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<{ title: string; content: string }> {
    const { code } = data;
    const [_, unClaimedCount] =
      await this.envelopContract.getRedPacketBalance(code);
    return {
      title: 'Red Envelope Info',
      content: `<p>There are still ${unClaimedCount} red packets unclaimed.</p>`,
    };
  }
}
