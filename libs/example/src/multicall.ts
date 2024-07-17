import { Contract, JsonRpcProvider } from 'ethers';
import { Action, ActionMetadata, GeneratedTransaction } from 'src/common/dto';
import configFactory from './config';

const config = configFactory();
const MULTICALL_ADDRESS = config.multicallAddress;

// Setup the provider (in viem, this is called a client).
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
if (!MAINNET_RPC_URL)
  throw new Error('Please set the MAINNET_RPC_URL environment variable.');
const provider = new JsonRpcProvider(MAINNET_RPC_URL);

const MULTICALL_ABI_ETHERS = [
  // https://github.com/mds1/multicall
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
];

const multicall = new Contract(
  MULTICALL_ADDRESS,
  MULTICALL_ABI_ETHERS,
  provider,
);

class MulticallAction implements Action {
  async getMetadata(): Promise<ActionMetadata> {
    return {
      title: 'Multicall',
      description: 'Multicall contract',
      networks: [
        {
          name: 'Ethereum',
          chainId: '1',
          contractAddress: MULTICALL_ADDRESS,
        },
      ],
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
  async generateTransaction(): Promise<GeneratedTransaction> {
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
    return {
      tx: tx,
      shouldSend: true,
    };
  }
}

const action = new MulticallAction();
export default action;
