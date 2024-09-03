import { ActionMetadata } from 'src/common/dto';

export const metadata: ActionMetadata = {
  title: 'Buy me a coffee ☕',
  description:
    'This action allows you to create a Magic Link to receive donations',
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
  magicLinkMetadata: {
    description:
      'Magic Link Enthusiast | Donate with your love for zkLink magic',
  },
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
            label: 'ETH',
            value: '',
            chainId: '42161',
          },
          {
            label: 'ETH',
            value: '',
            chainId: '810180',
          },
          {
            label: 'ETH',
            value: '',
            chainId: '810181',
          },
          {
            label: 'ETH',
            value: '',
            chainId: '270',
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

export const providerConfig: { [key in number]: string } = {
  42161: 'https://arbitrum.llamarpc.com	',
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
  270: 'http://3.112.15.165:3050',
};
