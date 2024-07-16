import { ethers } from 'ethers';
import FACTORY_ABI from './abis/factory.json';
import QUOTER_ABI from './abis/quoter.json';
import SWAP_ROUTER_ABI from './abis/swaprouter.json';
import POOL_ABI from './abis/pool.json';
import ERC20_ABI from './abis/erc20.json';
import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';
import 'dotenv/config';

// Deployment Addresses
const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c283f1a3C6981eE623cb4E8AcC4f450f39D0815';
const QUOTER_CONTRACT_ADDRESS = '0xa73A1d496dd147e68F557Dd73A28Ad6330777350';
const SWAP_ROUTER_CONTRACT_ADDRESS =
  '0x2c98143431993e4CBD5eFD4B93c099432cacEBcE';

// Provider, Contract & Signer Instances
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
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
const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

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

interface Params {
  tokenInAddress: string;
  tokenOutAddress: string;
  fee: number; // fee level, 0.3% fee is 3000
  recipient: string;
  deadlineDurationInSec: number;
  amountIn: bigint;
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
    signer,
  );
  const transaction =
    await swapRouter.exactInputSingle.populateTransaction(swapParams);
  return transaction;
}

class Action implements ActionDto {
  getMetadata(): ActionMetadata {
    return {
      title: 'NovaSwap',
      description: 'Swap tokens',
      network: {
        name: 'Ethereum',
        chainId: '1',
        contractAddress: '0x',
      },
      dApp: { name: 'NovaSwap' },
      author: { name: 'zkLink' },
      intent: {
        components: [
          {
            name: 'tokenInAddress',
            label: 'Token In Address',
            desc: 'The address of the token you want to swap',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Address',
          },
          {
            name: 'TokenOutAddress',
            label: 'Token Out Address',
            desc: 'The address of the token you want to receive',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Address',
          },
          {
            name: 'amountIn',
            label: 'Amount',
            desc: 'The amount of tokens you want to swap',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
          {
            name: 'recipient',
            label: 'Recipient',
            desc: 'The recipient of the swapped tokens',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Address',
          },
          {
            name: 'fee',
            label: 'Pool Fee',
            desc: 'The pool fee',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
          {
            name: 'deadlineDurationInSec',
            label: 'Deadline Duration in Seconds',
            desc: 'The deadline duration in seconds',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
        ],
      },
    };
  }

  generateTransaction(_params: { [key: string]: any }): GeneratedTransaction {
    let tx = null;
    swapToken(_params as Params)
      .then((transaction) => {
        tx = transaction;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    const generatedTransaction = {
      tx: tx,
      shouldSend: true,
    };
    return generatedTransaction;
  }
}

const action = new Action();
export default action;
