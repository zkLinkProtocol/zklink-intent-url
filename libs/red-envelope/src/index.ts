import { JsonRpcProvider, ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';
import { utils } from 'zksync-web3';

import ERC20ABI from './abis/ERC20.json';
import RedPacketABI from './abis/RedPacket.json';
import { METADATA } from './config';
import { DistributionModeValue, GasTokenValue } from './type';

const WETH_ADDRESS = '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169';
const QUOTER_ADDRESS = '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A';
const RED_PACKET_ADDRESS = '0x83C142a6504DAF55758f2D702dd89209C5F7F670';
const RED_PACKET_PAYMASTER_ADDRESS =
  '0x8f283dEB6E1612fD016D139bAF465208402F9C3d';
const PACKET_HASH = ethers.keccak256(ethers.toUtf8Bytes('REDPACKET'));

interface CreateRedPacketParams {
  creator: string;
  token: string;
  totalCount: number;
  tokenAmount: number;
  payForGas: number;
  totalShare: number;
  packetHash: string;
  isRandom: boolean;
  isGasFree: boolean;
  expiry: number;
}

interface ClaimRedPacketParams {
  id: string;
  recipient: string;
  expiry: number;
}

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  private envelopContract: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  private chainId = 810181;

  constructor() {
    this.provider = new JsonRpcProvider('https://sepolia.rpc.zklink.io');
    const privateKey = process.env.RED_ENVELOPE_WALLET; // 67e287bc6f8a5e95992447f20a72a8afae6097ec08666241d38dce9881005216
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
      isGasFree: params.isGasFree,
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
    const id = 'TODO';
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

  private async getDecimals(tokenAddress: string) {
    const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.provider);
    try {
      const decimals = await contract.decimals();
      return decimals;
    } catch (error) {
      console.error(`Failed to fetch decimals: ${error.message}`);
    }
  }

  private async afterActionUrlCreated(
    code: string,
    params: any,
  ): Promise<GeneratedTransaction> {
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
    const isGasFree = gasToken === GasTokenValue.DistributedToken;
    // const txGas = await this.claimRedEnvelopeTxGas();
    const payForGas = isGasFree ? 0 : 10;
    // : await this.getQuote(distributionToken, txGas);

    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = this.genCreateSignature({
      creator: this.wallet.address,
      token: distributionToken,
      totalCount: amountOfRedEnvelopes,
      tokenAmount: totalDistributionAmount,
      payForGas: payForGas,
      totalShare: totalShare,
      packetHash: packetHash,
      isRandom: isRandom,
      isGasFree: isGasFree,
      expiry: expiry,
    });

    const tx = await this.envelopContract.createRedPacket.populateTransaction(
      code,
      distributionToken,
      amountOfRedEnvelopes,
      totalDistributionAmount,
      payForGas,
      totalShare,
      packetHash,
      isRandom,
      isGasFree,
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
          shouldSend: false,
        },
      ],
      tokens: [],
    };
  }

  public async validateIntentParams(params: any): Promise<any> {
    const { totalDistributionAmount, distributionToken, amountOfRedEnvelopes } =
      params;
    const txGas = await this.claimRedEnvelopeTxGas();
    const decimals = await this.getDecimals(distributionToken);

    if (
      Number(txGas) * amountOfRedEnvelopes * 1.5 >=
      totalDistributionAmount * decimals
    ) {
      return 'The amount of the pool is too low to cover gas fee';
    }

    if (amountOfRedEnvelopes > 100) {
      return 'A maximum of 100 red envelopes can be sent at one time';
    }
  }

  // async afterActionUrlCreated(actionUrl: ActionUrl): Promise<void> {}

  // async beforeActionUrlEdited(settings: object): Promise<void> {}

  // async afterActionUrlEdited(actionUrl: ActionUrl): Promise<void> {}

  // async beforeActionUrlDeleted(actionUrl: ActionUrl): Promise<void> {}

  // async afterActionUrlDeleted(actionUrl: ActionUrl): Promise<void> {}

  public async generateTransaction(
    parameters: ActionTransactionParams,
  ): Promise<GeneratedTransaction> {
    const paymasterParams = utils.getPaymasterParams(
      RED_PACKET_PAYMASTER_ADDRESS,
      {
        type: 'General',
        innerInput: new Uint8Array(),
      },
    );
    const tx =
      await this.envelopContract.claimRedPacket.populateTransaction(parameters);
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

export default action;
