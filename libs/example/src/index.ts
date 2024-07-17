import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';
import configFactory from './config';
import ROUTER_ABI from './abis/router.json';
const config = configFactory();
const ROUTER_ADDRESS = config.routerAddress;
const provider = new ethers.JsonRpcProvider(config.rpcUrl);
const routerContract = new ethers.Contract(
  ROUTER_ADDRESS,
  ROUTER_ABI,
  provider,
);

interface Params {
  tokenIn: string;
  tokenOut: string;
  fee: number; // fee level, 0.3% fee is 3000
  recipient: string;

  deadlineDurationInMinute: number;
  amountIn: bigint; // must be the real value after ethers.parseUnits
  amountOutMinimum: bigint;
  sqrtPriceLimitX96?: number;
}

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return {
      title: 'Swap',
      description: 'Swap tokens',
      network: {
        name: 'Ethereum',
        chainId: '1',
        contractAddress: '0x',
      },
      dApp: { name: 'NovaSwap' },
      author: { name: 'NovaSwap' },
      intent: {
        components: [
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
  }

  async generateTransaction(parameters: {
    [key: string]: any;
  }): Promise<GeneratedTransaction> {
    const params = parameters as Params;

    const exactInputSingleParams = {
      tokenIn: params.tokenIn,
      tokenOut: params.tokenOut,
      fee: params.fee,
      recipient: params.recipient,
      deadline:
        Math.floor(Date.now() / 1000) + 60 * params.deadlineDurationInMinute,
      amountIn: params.amountIn,
      amountOutMinimum: params.amountOutMinimum,
      sqrtPriceLimitX96: 0,
    };

    const tx = await routerContract.exactInputSingle.populateTransaction(
      exactInputSingleParams,
    );
    return {
      tx: tx,
      shouldSend: true,
    };
  }
}

const action = new Action();
export default action;
