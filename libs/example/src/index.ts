import { ethers } from 'ethers';
import { NOVA_SWAP_ABI as abi } from './const';
import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const routerAddress = 'ROUTER_ADDRESS';
const routerContract = new ethers.Contract(routerAddress, abi, provider);

interface Params {
  tokenIn: string;
  tokenOut: string;
  fee: number; // fee level, 0.3% fee is 3000
  recipient: string;

  deadlineDurationInSec: number; // in seconds
  amountIn: bigint; // must be the real value after ethers.parseUnits
  amountOutMinimum: bigint;
  sqrtPriceLimitX96?: number;
}

class Action implements ActionDto {
  getMetadata(): ActionMetadata {
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
  generateTransaction(parameters: {
    [key: string]: any;
  }): GeneratedTransaction {
    const params = parameters as Params;

    const exactInputSingleParams = {
      tokenIn: params.tokenIn,
      tokenOut: params.tokenOut,
      fee: params.fee,
      recipient: params.recipient,
      deadline:
        Math.floor(Date.now() / 1000) + 60 * params.deadlineDurationInSec,
      amountIn: params.amountIn,
      amountOutMinimum: params.amountOutMinimum,
      sqrtPriceLimitX96: 0,
    };

    let tx = null;
    routerContract.exactInputSingle
      .populateTransaction(exactInputSingleParams)
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
  }
}

const action = new Action();
export default action;
