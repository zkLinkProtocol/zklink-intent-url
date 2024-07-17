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
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
      {
        name: 'tokenOutAddress',
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
