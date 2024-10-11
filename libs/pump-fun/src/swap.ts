import { Contract, Provider, ethers } from 'ethers';

import ERC20_ABI from './abis/erc20.json';
import FACTORY_ABI from './abis/factory.json';
import POOL_ABI from './abis/pool.json';
import SWAP_ROUTER_ABI from './abis/swaprouter.json';

export class NovaSwap {
  private chainId: number;
  private provider: Provider;
  private factoryContract: Contract;
  private swapRouterContract: Contract;

  constructor(
    provider: Provider,
    factoryContractAddress: string,
    swapRouterContractAddress: string,
    chainId: number,
  ) {
    this.provider = provider;
    this.factoryContract = new ethers.Contract(
      factoryContractAddress,
      FACTORY_ABI,
      provider,
    );
    this.swapRouterContract = new ethers.Contract(
      swapRouterContractAddress,
      SWAP_ROUTER_ABI,
      provider,
    );
    this.chainId = chainId;
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

  public async swapToken(
    tokenIn: string,
    tokenOut: string,
    amountIn: bigint,
    recipient: string,
    _fee: number,
  ) {
    let value = '0';
    if (tokenIn == ethers.ZeroAddress) {
      tokenIn = await this.swapRouterContract.WETH9();
      value = amountIn.toString();
    }

    if (tokenOut == ethers.ZeroAddress) {
      tokenOut = await this.swapRouterContract.WETH9();
    }
    const { poolContract } = await this.getPoolInfo(
      this.factoryContract,
      tokenIn,
      tokenOut,
      _fee,
    );

    const swapParams = {
      tokenIn,
      tokenOut,
      fee: await poolContract.fee(),
      recipient,
      amountIn,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    };

    const transaction =
      await this.swapRouterContract.exactInputSingle.populateTransaction(
        swapParams,
      );

    const tx = {
      chainId: this.chainId,
      value: value,
      to: transaction.to,
      data: transaction.data,
      shouldPublishToChain: true,
    };
    return [tx];
  }
}
