import { ActionMetadata } from 'src/common/dto';

export const metadata: ActionMetadata = {
  title: 'Slipt Order',
  description: 'Support the works you love',
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
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
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
            value: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            chainId: '1',
          },
          {
            label: 'USDT',
            value: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            chainId: '1',
          },
          {
            label: 'USDC',
            value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            chainId: '1',
          },
          {
            label: 'WETH',
            value: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
            chainId: '42161',
          },
          {
            label: 'USDT',
            value: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
            chainId: '42161',
          },
          {
            label: 'USDC',
            value: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            chainId: '42161',
          },
          {
            label: 'WETH',
            value: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
            chainId: '810180',
          },
          {
            label: 'USDT',
            value: '0x2F8A25ac62179B31D62D7F80884AE57464699059',
            chainId: '810180',
          },
          {
            label: 'USDC',
            value: '0x1a1A3b2ff016332e866787B311fcB63928464509',
            chainId: '810180',
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
        desc: 'The address that is recipient',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  1: 'https://eth.llamarpc.com',
  42161: 'https://arbitrum.llamarpc.com	',
  810180: 'https://rpc.zklink.io',
};
