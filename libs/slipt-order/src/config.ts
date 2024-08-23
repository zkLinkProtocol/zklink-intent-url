import { ActionMetadata } from 'src/common/dto';

export const metadata: ActionMetadata = {
  title: 'Slipt Order',
  description: 'Support the works you love',
  logo: '',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
    {
      name: 'Arbitrum',
      chainId: '42161',
      contractAddress: '0x',
    },
    {
      name: 'zkLink Nova',
      chainId: '810180',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'Slipt Order' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'token',
        label: 'Token',
        desc: 'The token you want to charge',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Symbol',
        options: [
          {
            label: 'WETH',
            value: 'weth',
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
        name: 'value',
        label: 'Amount',
        desc: 'The amount to collection',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: 'The address that is user',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
