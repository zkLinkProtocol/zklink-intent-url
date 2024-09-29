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
  // networks is loaded from okx when application starts
  networks: [],
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
