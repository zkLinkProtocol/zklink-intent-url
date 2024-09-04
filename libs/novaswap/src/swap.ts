import { getERC20SymbolAndDecimals } from '@action/utils';
import { Contract, Provider, ethers } from 'ethers';
import { Token } from 'src/common/dto';
import { Tx } from 'src/common/dto';

import ERC20_ABI from './abis/erc20.json';
import FACTORY_ABI from './abis/factory.json';
import POOL_ABI from './abis/pool.json';
import QUOTER_ABI from './abis/quoter.json';
import SWAP_ROUTER_ABI from './abis/swaprouter.json';
import { Params } from './interface';

export class NovaSwap {
  private provider: Provider;
  private factoryContract: Contract;
  private quoterContract: Contract;
  private swapRouterContract: Contract;
  constructor(
    provider: Provider,
    factoryContractAddress: string,
    quoterContractAddress: string,
    swapRouterContractAddress: string,
  ) {
    this.provider = provider;
    this.factoryContract = new ethers.Contract(
      factoryContractAddress,
      FACTORY_ABI,
      provider,
    );
    this.quoterContract = new ethers.Contract(
      quoterContractAddress,
      QUOTER_ABI,
      provider,
    );
    this.swapRouterContract = new ethers.Contract(
      swapRouterContractAddress,
      SWAP_ROUTER_ABI,
      provider,
    );
  }

  public async getPoolInfo(
    factoryContract: ethers.Contract,
    tokenInAddress: string,
    tokenOutAddress: string,
    poolFee: number,
  ) {
    const poolAddress = await factoryContract.getPool(
      tokenInAddress,
      tokenOutAddress,
      poolFee,
    );
    if (!poolAddress) {
      throw new Error('Failed to get pool address');
    }
    const poolContract = new ethers.Contract(
      poolAddress,
      POOL_ABI,
      this.provider,
    );
    const [token0, token1, fee] = await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
    ]);
    return { poolContract, token0, token1, fee };
  }

  public async tokenDecimal(tokenAddress: string) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider,
    );
    const decimals = await tokenContract.decimals();
    return decimals;
  }

  public async quoteAndLogSwap(
    quoterContract: ethers.Contract,
    tokenInAddress: string,
    tokenOutAddress: string,
    fee: number,
    recipient: string,
    amountIn: bigint,
    deadlineInSecs: number,
  ) {
    const quotedAmountOut =
      await quoterContract.quoteExactInputSingle.staticCall({
        tokenIn: tokenInAddress,
        tokenOut: tokenOutAddress,
        fee: fee,
        recipient: recipient,
        deadline: Math.floor(new Date().getTime() / 1000 + deadlineInSecs),
        amountIn: amountIn,
        sqrtPriceLimitX96: 0,
      });
    const tokenOutDecimals = await this.tokenDecimal(tokenOutAddress);
    const amountOut = ethers.formatUnits(quotedAmountOut[0], tokenOutDecimals);
    return amountOut;
  }

  public async swapToken(params: Params, _fee: number, referrer: string) {
    const { symbol, decimals } = await getERC20SymbolAndDecimals(
      this.provider,
      params.tokenInAddress,
    );
    const amountIn = ethers.parseUnits(params.amountIn.toString(), decimals);

    const referralAmount = BigInt(
      Math.floor((Number(params.referralRate) * Number(amountIn)) / 100),
    );
    const referralTx = await this.getReferralTx(
      params.tokenInAddress,
      referralAmount,
      referrer,
    );

    const swapAmount = amountIn - referralAmount;
    const { poolContract, fee } = await this.getPoolInfo(
      this.factoryContract,
      params.tokenInAddress,
      params.tokenOutAddress,
      _fee,
    );

    const quotedAmountOut = await this.quoteAndLogSwap(
      this.quoterContract,
      params.tokenInAddress,
      params.tokenOutAddress,
      fee,
      params.recipient,
      swapAmount,
      params.deadlineDurationInSec,
    );

    const swapParams = {
      tokenIn: params.tokenInAddress,
      tokenOut: params.tokenOutAddress,
      fee: await poolContract.fee(),
      recipient: params.recipient,
      amountIn: swapAmount,
      amountOutMinimum: quotedAmountOut[0].toString(),
      sqrtPriceLimitX96: 0,
    };
    const transaction =
      await this.swapRouterContract.exactInputSingle.populateTransaction(
        swapParams,
      );
    const tx = {
      chainId: 810180,
      value: '0',
      to: transaction.to,
      data: transaction.data,
      dataObject: {
        'Token In': params.tokenInAddress,
        'Token Out': params.tokenOutAddress,
        Recipient: params.recipient,
        'Amount In': swapAmount.toString(),
        'Amount In Decimal': decimals,
        Fee: fee,
        'Deadline Duration in Second': params.deadlineDurationInSec,
      },
      shouldSend: true,
    };

    const token: Token = {
      chainId: 810180, // zkLink
      token: params.tokenInAddress,
      amount: amountIn.toString(),
      decimals: decimals,
      symbol: symbol,
    };

    if (referralAmount > 0) {
      return {
        txs: [referralTx, tx],
        tokens: [token],
      };
    } else {
      return {
        txs: [tx],
        tokens: [token],
      };
    }
  }

  public async getReferralTx(
    tokenInAddress: string,
    referralAmount: bigint,
    referrer: string,
  ): Promise<Tx> {
    const tokenInContract = new ethers.Contract(
      tokenInAddress,
      ERC20_ABI,
      this.provider,
    );
    console.log('get referral tx');
    const transaction = await tokenInContract.transfer.populateTransaction(
      referrer,
      referralAmount,
    );
    const referralTx = {
      chainId: 810180,
      value: '0',
      to: transaction.to,
      data: transaction.data,
      dataObject: {
        'Referral Token': tokenInAddress,
        Amount: referralAmount.toString(),
        Referrer: referrer,
      },
      shouldSend: true,
    };

    return referralTx;
  }
}
