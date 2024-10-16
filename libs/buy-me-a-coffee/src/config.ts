import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'Buy me a coffee ☕',
  description:
    '<div>This action allows you to create a Magic Link to receive donations</div>',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
    },
    {
      name: 'zkLink Nova',
      chainId: '810180',
    },
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
    },
    {
      name: 'zkLink dev',
      chainId: '270',
    },
    {
      name: 'Base Sepolia',
      chainId: '84532',
    },
    {
      name: 'Arbitrum Sepolia',
      chainId: '421614',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    title: 'Buy me a coffee ☕',
    description:
      'Magic Link Enthusiast | Donate with your love for zkLink magic',
  },
  intent: {
    binding: 'value',
    components: [
      {
        name: 'token',
        label: 'Token',
        desc: 'The token you want to cost',
        type: 'searchSelect',
        options: [
          {
            label: 'ETH',
            value: '',
            chainId: '42161',
            default: true,
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
            label: 'ETH',
            value: '',
            chainId: '810180',
            default: true,
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
          {
            label: 'ETH',
            value: '',
            chainId: '810181',
            default: true,
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
          },
          {
            label: 'ETH',
            value: '',
            chainId: '270',
            default: true,
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
          },
          {
            label: 'ETH',
            value: '',
            chainId: '84532',
          },
          {
            label: 'ETH',
            value: '',
            chainId: '421614',
          },
        ],
      },
      {
        name: 'value',
        label: 'Amount',
        desc: 'The amount to sponsor',
        type: 'input',
        regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: 'The address that is sponsored',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Invalid Address',
      },
    ],
    preset: [
      {
        field: 'value',
        title: '0.001 ETH',
        type: 'Button',
        value: '0.001',
      },
      {
        field: 'value',
        title: '0.005 ETH',
        type: 'Button',
        value: '0.005',
      },
      {
        field: 'value',
        title: '0.01 ETH',
        type: 'Button',
        value: '0.01',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  42161: 'https://arbitrum.llamarpc.com	',
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
  270: 'http://3.112.15.165:3050',
  84532: 'https://sepolia.base.org',
  421614: 'https://arbitrum-sepolia.gateway.tenderly.co',
};

export const browserConfig: { [key in number]: string } = {
  42161: 'https://arbiscan.io/tx/',
  810180: 'https://explorer.zklink.io/tx/',
  810181: 'https://sepolia.explorer.zklink.io/tx/',
  270: 'http://3.112.15.165:3050',
  84532: 'https://base-sepolia.blockscout.com/tx',
  421614: 'https://sepolia.arbiscan.io/tx',
};

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};
