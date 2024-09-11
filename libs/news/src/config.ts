import { ActionMetadata } from 'src/common/dto';

export type FormName = 'amountToBuy' | 'tokenIn' | 'tokenOutAddress';

export const METADATA: ActionMetadata<FormName> = {
  title: 'news',
  description: '<div>Perform news seamlessly across multiple networks</div>',
  logo: 'https://placehold.co/40x40',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'News' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
  intent: {
    components: [
      {
        name: 'amountToBuy',
        label: 'Amount to Buy',
        desc: 'The amount of input tokens used to buy output tokens',
        type: 'input',
        regex: '^[0-9]+(.[0-9]+)?$',
        regexDesc: 'Positive number',
      },
      {
        name: 'tokenIn',
        label: 'Token In ',
        desc: 'The token you want to swap',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Symbol',
        options: [
          {
            label: 'WETH',
            value: 'weth',
          },
          {
            label: 'WBTC',
            value: 'wbtc',
          },
          {
            label: 'USDT',
            value: 'usdt',
          },
          {
            label: 'USDC',
            value: 'usdc',
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
