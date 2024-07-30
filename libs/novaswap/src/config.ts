import { ActionMetadata } from 'src/common/dto';

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c283f1a3C6981eE623cb4E8AcC4f450f39D0815';
export const QUOTER_CONTRACT_ADDRESS =
  '0xa73A1d496dd147e68F557Dd73A28Ad6330777350';
export const SWAP_ROUTER_CONTRACT_ADDRESS =
  '0x2c98143431993e4CBD5eFD4B93c099432cacEBcE';
export const RPC_URL = 'https://sepolia.rpc.zklink.io';

export const METADATA: ActionMetadata = {
  title: 'NovaSwap',
  logo: 'https://placehold.co/40x40',
  description: 'Swap tokens',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'NovaSwap' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'tokenInAddress',
        label: 'Token In Address',
        desc: 'The address of the token you want to swap',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'WETH',
            value: '0x6e42d10eB474a17b14f3cfeAC2590bfa604313C7',
          },
        ],
      },
      {
        name: 'tokenOutAddress',
        label: 'Token Out Address',
        desc: 'The address of the token you want to receive',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'USDC',
            value: '0x461fE851Cd66e82A274570ED5767c873bE9Ae1ff',
          },
        ],
      },
      {
        name: 'amountIn',
        label: 'Amount',
        desc: 'The amount of tokens you want to swap',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
        defaultValue: '1000000',
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
