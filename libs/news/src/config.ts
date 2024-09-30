import { ActionMetadata } from 'src/common/dto';
import { Address } from 'src/types';
export type FieldTypes = {
  amountToBuy: string;
  tokenFrom: Address;
  tokenTo: Address;
};

export const METADATA: ActionMetadata<FieldTypes> = {
  title: 'Magic News',
  description: '<div>Perform news seamlessly across multiple networks</div>',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
    },
    {
      name: 'Arbitrum',
      chainId: '42161',
    },
    {
      name: 'Optimism',
      chainId: '10',
    },
    {
      name: 'zkSync Era',
      chainId: '324',
    },
    {
      name: 'Linea',
      chainId: '59144',
    },
    {
      name: 'Mantle',
      chainId: '5000',
    },
    {
      name: 'Base',
      chainId: '8453',
    },
    {
      name: 'Scroll',
      chainId: '534352',
    },
    {
      name: 'Manta Pacific',
      chainId: '169',
    },
  ],
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
        name: 'tokenFrom',
        label: 'Token From ',
        desc: 'The token you want to swap',
        type: 'inputSelect',
        options: [
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
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Invalid Address',
      },
      {
        name: 'tokenTo',
        label: 'Token To',
        desc: 'The address of the token you want to receive',
        type: 'inputSelect',
        options: [
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
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Invalid Address',
      },
    ],
  },
};
