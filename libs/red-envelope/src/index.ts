import {
  JsonRpcProvider,
  ethers,
  getBigInt,
  keccak256,
  parseUnits,
  toUtf8Bytes,
} from 'ethers';
import { utils } from 'zksync-ethers';

import ERC20ABI from './abis/ERC20.json';
import RedPacketABI from './abis/RedPacket.json';
import { METADATA } from './config';
import { DistributionModeValue, GasTokenValue } from './type';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from '../../../src/common/dto';

const WETH_ADDRESS = '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169';
const QUOTER_ADDRESS = '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A';
const RED_PACKET_ADDRESS = '0xD6D392794aDCA3d3EF300c3Cc99B8AfD89da2235';
const RED_PACKET_PAYMASTER_ADDRESS =
  '0x8f283dEB6E1612fD016D139bAF465208402F9C3d';
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

class Action extends ActionDto {
  public async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }
  public envelopContract: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  private chainId = 810181;

  constructor() {
    super();
    this.provider = new JsonRpcProvider('https://sepolia.rpc.zklink.io');
    const privateKey =
      '67e287bc6f8a5e95992447f20a72a8afae6097ec08666241d38dce9881005216';
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.envelopContract = new ethers.Contract(
      RED_PACKET_ADDRESS,
      RedPacketABI,
      this.wallet,
    );
  }

  private async genCreateSignature(params: CreateRedPacketParams) {
    const domain = {
      name: 'RedPacket',
      version: '0',
      chainId: this.chainId,
      verifyingContract: RED_PACKET_ADDRESS,
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
      chainId: this.chainId,
      verifyingContract: RED_PACKET_ADDRESS,
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
    const txCost = gasEstimate * maxFeePerGas;
    return txCost;
  }

  private async getQuote(tokenOut: string, EthAmountIn: bigint) {
    const fee = 3000;
    const quoterAbi = [
      'function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) external returns (uint256 amountOut)',
    ];
    const quoter = new ethers.Contract(
      QUOTER_ADDRESS,
      quoterAbi,
      this.provider,
    );
    try {
      const amountOut = await quoter.quoteExactInputSingle(
        WETH_ADDRESS,
        tokenOut,
        fee,
        EthAmountIn,
        0,
      );
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
    try {
      const decimals = await contract.decimals();
      return decimals;
    } catch (error) {
      console.error(`Failed to fetch decimals: ${error.message}`);
    }
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
    const payForGas = isGasfree ? txGas : 0n;
    const decimals = await this.getDecimals(distributionToken);
    // : await this.getQuote(distributionToken, txGas);
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
      RED_PACKET_ADDRESS,
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
          chainId: this.chainId,
          to: approveData.to,
          value: '0',
          data: approveData.data,
          dataObject: {},
          shouldSend: false,
        },
        {
          chainId: this.chainId,
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
      RED_PACKET_PAYMASTER_ADDRESS,
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
          chainId: this.chainId,
          to: RED_PACKET_ADDRESS,
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
}

const action = new Action();

// action.envelopContract.on('RedPacketCreated', function (redPacketId: number) {
//   console.log(redPacketId);
// });

export default action;
