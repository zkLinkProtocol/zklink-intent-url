import { Contract, JsonRpcProvider } from 'ethers';
import { MULTICALL_ADDRESS, MULTICALL_ABI_ETHERS } from './const';
import {
  Action,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/interfaces';

// Setup the provider (in viem, this is called a client).
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
if (!MAINNET_RPC_URL)
  throw new Error('Please set the MAINNET_RPC_URL environment variable.');
const provider = new JsonRpcProvider(MAINNET_RPC_URL);

const multicall = new Contract(
  MULTICALL_ADDRESS,
  MULTICALL_ABI_ETHERS,
  provider,
);

class MulticallAction implements Action {
  getMetadata(): ActionMetadata {
    return {
      title: 'Multicall',
      description: 'Multicall contract',
      network: {
        name: 'Ethereum',
        chainId: '1',
        contractAddress: MULTICALL_ADDRESS,
      },
      dApp: {
        name: 'Multicall',
        url: 'https://...',
      },
      author: {
        name: '...',
      },
      intent: {
        components: [],
      },
    };
  }
  generateTransaction(): GeneratedTransaction {
    const developerAddress = '0x...';
    const kolAddress = '0x...';
    const contractAddress = '0x...';
    const multicallArgs = [
      {
        target: contractAddress,
        allowFailure: false, // We allow failure for all calls.
        callData: '0x...',
      },
      {
        to: developerAddress, // commission fee to developer
        value: 100,
      },
      {
        to: kolAddress, // commission fee to KOL
        value: 100,
      },
    ];

    let tx = null;
    multicall.aggregate3
      .populateTransaction(multicallArgs)
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

const action = new MulticallAction();
export default action;
