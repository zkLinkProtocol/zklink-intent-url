import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const metadata: ActionMetadata<FormName> = {
  title: 'Split Bill 💰',
  description: 'This action is made for friends to split the bill',
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
  dApp: { name: 'Split bill' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    description: 'Each friend will pay you the same amount',
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
            label: 'USDT',
            value: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
            chainId: '42161',
          },
          {
            label: 'USDC',
            value: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
            chainId: '42161',
            default: true,
          },
          {
            label: 'ETH',
            value: '',
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
            default: true,
          },
          {
            label: 'ETH',
            value: '',
            chainId: '810181',
          },
          {
            label: 'USDT',
            value: '0x0efDC9f3948BE4509e8c57d49Df97660CF038F9a',
            chainId: '810181',
          },
          {
            label: 'USDC',
            value: '0xAC4a95747cB3f291BC4a26630862FfA0A4b01B44',
            chainId: '810181',
            default: true,
          },
          {
            label: 'ETH',
            value: '',
            chainId: '270',
          },
          {
            label: 'USDT',
            value: '0xDBBD57f02DdbC9f1e2B80D8DAcfEC34BC8B287e3',
            chainId: '270',
          },
          {
            label: 'USDC',
            value: '0x09B141F8a41BA6d2A0Ec1d55d67De3C8f3846921',
            chainId: '270',
            default: true,
          },
        ],
      },
      {
        name: 'value',
        label: 'Amount',
        desc: 'The amount of tokens you receive from each friend.',
        type: 'input',
        regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
        defaultValue: '10',
        regexDesc: 'Must be a number',
        bind: true,
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: "Please enter the recipient's address.",
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

export const browserConfig: { [key in number]: string } = {
  42161: 'https://arbiscan.io/tx/',
  810180: 'https://explorer.zklink.io/tx/',
  810181: 'https://sepolia.explorer.zklink.io/tx/',
  270: 'http://3.112.15.165:3050',
};

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};
