import type { Action, GeneratedTransaction } from 'src/common/interfaces';
import { ethers } from 'ethers';
import { Token, TradeType, Percent, CurrencyAmount } from '@uniswap/sdk-core';
import { Pool, Route, Trade, SwapRouter } from '@uniswap/v3-sdk';
import { ERC20Tokens } from './const';

interface Params {
  // fromToken: string;
  fromTokenAddress: string;
  fromTokenDecimals: number;
  // toToken: string;
  toTokenAddress: string;
  toTokenDecimals: number;
  amount: string; // ethers.parseEther('1').toString();
  recipient: string; // User's wallet address
  poolFee: number;

  slippageTolerance?: number; // 1 for 0.01%
  deadlineDuration?: number; // in seconds
}

async function constructTransaction(params: Params) {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  // Get the pool address
  const poolContract = new ethers.Contract(
    process.env.POOL_ADDRESS,
    [
      'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
      'function liquidity() external view returns (uint128)',
    ],
    provider,
  );
  const [sqrtPriceX96, tick] = await poolContract.slot0();
  const liquidity = await poolContract.liquidity();

  const tokenA = new Token(
    1,
    params.fromTokenAddress,
    params.fromTokenDecimals,
  );
  const tokenB = new Token(1, params.toTokenAddress, params.toTokenDecimals);
  const pool = new Pool(
    tokenA,
    tokenB,
    params.poolFee,
    sqrtPriceX96.toString(),
    liquidity,
    tick,
  );

  // Create a route
  const route = new Route([pool], tokenA, tokenB);

  // Create a trade
  const amountIn = CurrencyAmount.fromRawAmount(tokenA, params.amount);
  const trade = await Trade.fromRoute(route, amountIn, TradeType.EXACT_INPUT);

  if (!params.slippageTolerance) {
    params.slippageTolerance = 50;
  }
  const slippageTolerance = new Percent(params.slippageTolerance, 10000);
  if (!params.deadlineDuration) {
    params.deadlineDuration = 60 * 20;
  }
  const deadline = Math.floor(Date.now() / 1000) + params.deadlineDuration;
  // Construct the swap options
  const swapOptions = {
    slippageTolerance: slippageTolerance,
    deadline: deadline,
    recipient: params.recipient,
  };

  // Construct the transaction data
  const { calldata, value } = SwapRouter.swapCallParameters(trade, swapOptions);

  // Construct the transaction object
  const transaction = {
    to: process.env.SWAP_ROUTER_ADDRESS,
    data: calldata,
    value: value,
  };

  return transaction;
}

const action: Action = {
  getMetadata() {
    return {
      title: 'Swap',
      description: 'Swap tokens',
      network: {
        name: 'Ethereum',
        chainId: '1',
        contractAddress: '0x',
      },
      dApp: {
        name: 'Uniswap',
        url: 'https://uniswap.org/',
      },
      author: {
        name: 'Uniswap',
        x: 'https://x.com/Uniswap',
        github: 'https://github.com/Uniswap',
      },
      intent: {
        components: [
          {
            name: 'from_token',
            label: 'From Token',
            desc: 'The token you want to swap from',
            type: 'searchSelectErc20',
            regex: '',
            regexDesc: '',
            options: ERC20Tokens,
          },
          {
            name: 'to_token',
            label: 'To Token',
            desc: 'The token you want to swap to',
            type: 'searchSelectErc20',
            regex: '',
            regexDesc: '',
            options: ERC20Tokens,
          },
          {
            name: 'from_token_decimals',
            label: 'From Token Decimals',
            desc: 'The decimals of the from token',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
          {
            name: 'to_token_decimals',
            label: 'To Token Decimals',
            desc: 'The decimals of the to token',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
          {
            name: 'amount',
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
            name: 'pool_fee',
            label: 'Pool Fee',
            desc: 'The pool fee',
            type: 'input',
            regex: '^[0-9]+$',
            regexDesc: 'Must be a number',
          },
        ],
      },
    };
  },

  generateTransaction(parameters: {
    [key: string]: any;
  }): GeneratedTransaction {
    //
    let tx = null;
    constructTransaction(parameters as Params)
      .then((result) => {
        tx = result;
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
  },
};

export default action;
