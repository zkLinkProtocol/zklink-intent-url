import { Contract, JsonRpcProvider } from 'ethers';
import { MULTICALL_ADDRESS, MULTICALL_ABI_ETHERS } from './const';
import { GeneratedTransaction } from 'src/common/interfaces';

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

// https://github.com/mds1/multicall/blob/main/examples/typescript/ethers.ts
async function constructTransaction() {
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

  const tx = await multicall.aggregate3.populateTransaction(multicallArgs);
  return tx;
}

const action = {
  getMetadata() {}, // Return your metadata here.
  generateTransaction(): GeneratedTransaction {
    let tx = null;
    constructTransaction()
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
