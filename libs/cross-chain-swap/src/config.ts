import { ActionMetadata } from 'src/common/dto';
import { Address } from 'src/types';

import { FormName } from './types';

export const ESTIMATED_GAS_WALLET: { [key: string]: string } = {
  '42161': '0x5ABC821cf6267534f8650189745B170Eeeff030D',
};

export const GAS_COEFFICIENT = 5;
export const TOKEN_CONFIG: {
  [key: string]: { [key: string]: { address: Address; decimal: number } };
} = {
  42161: {
    weth: {
      address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      decimal: 18,
    },
    wbtc: { address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f', decimal: 8 },
    usdt: { address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', decimal: 6 },
    usdc: { address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', decimal: 6 },
  },
};

export const METADATA: ActionMetadata<FormName> = {
  title: 'Cross Chain Swap',
  description:
    '<div>Perform cross-chain token swaps seamlessly across multiple networks</div>',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
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
        name: 'tokenTo',
        label: 'Token To',
        desc: 'The address of the token you want to receive',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
