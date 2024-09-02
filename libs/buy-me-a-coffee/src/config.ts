import { ActionMetadata } from 'src/common/dto';

export const metadata: ActionMetadata = {
  title: 'Buy me a coffee ☕',
  description: 'Magic Link Enthusiast | Donate with your love for zkLink magic',
  networks: [
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
  dApp: { name: 'Buy me a coffee' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  intent: {
    components: [
      {
        name: 'token',
        label: 'Token',
        desc: 'The token you want to cost',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Symbol',
        options: [
          {
            label: 'WETH',
            value: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            chainId: '42161',
            default: true,
          },
          {
            label: 'WETH',
            value: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
            chainId: '810180',
            default: true,
          },
        ],
      },
      {
        name: 'value',
        label: 'Amount',
        desc: 'The amount to sponsor',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: 'The address that is sponsored',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
