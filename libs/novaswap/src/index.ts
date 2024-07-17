import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';
import { Params } from './interface';
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
  RPC_URL,
  METADATA,
} from './config';
import FACTORY_ABI from './abis/factory.json';
import QUOTER_ABI from './abis/quoter.json';
import SWAP_ROUTER_ABI from './abis/swaprouter.json';
import POOL_ABI from './abis/pool.json';
import ERC20_ABI from './abis/erc20.json';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const factoryContract = new ethers.Contract(
  POOL_FACTORY_CONTRACT_ADDRESS,
  FACTORY_ABI,
  provider,
);
const quoterContract = new ethers.Contract(
  QUOTER_CONTRACT_ADDRESS,
  QUOTER_ABI,
  provider,
);

async function getPoolInfo(
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
  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider);
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);
  return { poolContract, token0, token1, fee };
}

async function tokenDecimal(tokenAddress) {
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const decimals = await tokenContract.decimals();
  return decimals;
}

async function quoteAndLogSwap(
  quoterContract,
  tokenInAddress,
  tokenOutAddress,
  fee,
  recipient,
  amountIn,
  deadlineInSecs,
) {
  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    {
      tokenIn: tokenInAddress,
      tokenOut: tokenOutAddress,
      fee: fee,
      recipient: recipient,
      deadline: Math.floor(new Date().getTime() / 1000 + deadlineInSecs),
      amountIn: amountIn,
      sqrtPriceLimitX96: 0,
    },
  );
  const tokenOutDecimals = await tokenDecimal(tokenOutAddress);
  const amountOut = ethers.formatUnits(quotedAmountOut[0], tokenOutDecimals);
  return amountOut;
}

async function swapToken(params: Params) {
  const inputAmount = params.amountIn;
  const amountIn = ethers.parseUnits(inputAmount.toString(), 18);
  const { poolContract, fee } = await getPoolInfo(
    factoryContract,
    params.tokenInAddress,
    params.tokenOutAddress,
    params.fee,
  );
  const quotedAmountOut = await quoteAndLogSwap(
    quoterContract,
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
  const swapRouter = new ethers.Contract(
    SWAP_ROUTER_CONTRACT_ADDRESS,
    SWAP_ROUTER_ABI,
    provider,
  );
  const transaction =
    await swapRouter.exactInputSingle.populateTransaction(swapParams);
  return transaction;
}

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(params: {
    [key: string]: any;
  }): Promise<GeneratedTransaction> {
    const tx = await swapToken(params as Params);
    return {
      tx: tx,
      shouldSend: true,
    };
  }
}

const action = new Action();
export default action;
