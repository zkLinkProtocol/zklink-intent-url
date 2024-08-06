import { ActionMetadata } from 'src/common/dto';

export const RPC_URL = {
  '42161': 'https://arb1.arbitrum.io/rpc',
};

export const METADATA: ActionMetadata = {
  title: 'Cross Chain Swap',
  description:
    'Perform cross-chain token swaps seamlessly across multiple netwoks',
  logo: 'https://placehold.co/40x40',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'NovaSwap' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'amount',
        label: 'Amount Of Token',
        desc: 'The amount of token you want to swap',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'tokenInAddress',
        label: 'Token In Address',
        desc: 'The address of the token you want to swap',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'WBTC',
            value: '0xA7ffF134e7C164e8E43C15099940e1e4fB0F83A9',
          },
        ],
      },
      {
        name: 'tokenOutAddress',
        label: 'Token Out Address',
        desc: 'The address of the token you want to receive',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
