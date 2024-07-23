import { Contract, Provider, ethers } from 'ethers';

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
    factoryContract,
    tokenInAddress,
    tokenOutAddress,
    poolFee,
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

  public async tokenDecimal(tokenAddress) {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      this.provider,
    );
    const decimals = await tokenContract.decimals();
    return decimals;
  }

  public async quoteAndLogSwap(
    quoterContract,
    tokenInAddress,
    tokenOutAddress,
    fee,
    recipient,
    amountIn,
    deadlineInSecs,
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

  public async swapToken(params: Params) {
    const inputAmount = params.amountIn;
    const amountIn = ethers.parseUnits(inputAmount.toString(), 18);
    const { poolContract, fee } = await this.getPoolInfo(
      this.factoryContract,
      params.tokenInAddress,
      params.tokenOutAddress,
      params.fee,
    );
    const quotedAmountOut = await this.quoteAndLogSwap(
      this.quoterContract,
      params.tokenInAddress,
      params.tokenOutAddress,
      fee,
      params.recipient,
      amountIn,
      params.deadlineDurationInSec,
    );
    const swapParams = {
      tokenIn: params.tokenInAddress,
      tokenOut: params.tokenOutAddress,
      fee: await poolContract.fee(),
      recipient: params.recipient,
      amountIn: amountIn,
      amountOutMinimum: quotedAmountOut[0].toString(),
      sqrtPriceLimitX96: 0,
    };
    const transaction =
      await this.swapRouterContract.exactInputSingle.populateTransaction(
        swapParams,
      );
    return transaction;
  }
}
