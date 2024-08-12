import { ActionMetadata } from 'src/common/dto';

export const RPC_URL = {
  '42161': 'https://arb1.arbitrum.io/rpc',
};

export const METADATA: ActionMetadata = {
  title: 'Cross Chain Swap',
  description:
    'Perform cross-chain token swaps seamlessly across multiple netwoks',
  logo: 'https://placehold.co/40x40',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'NovaSwap' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'isBuy',
        label: 'Buy Or Sell',
        desc: 'Buy or Sell',
        type: 'searchSelect',
        regex: '^true$|^false$',
        regexDesc: 'true or false',
        options: [
          {
            label: 'Buy',
            value: 'true',
          },
          {
            label: 'Sell',
            value: 'false',
          },
        ],
      },
      {
        name: 'percentOrAmount',
        label: 'Percent Or Amount',
        desc: 'Percent or Amount(only sell can use percent)',
        type: 'searchSelect',
        regex: '^percent$|^amount$',
        regexDesc: 'percent or amount',
        options: [
          {
            label: 'Percent(only sell can use percent)',
            value: 'percent',
          },
          {
            label: 'Amount',
            value: 'amount',
          },
        ],
      },
      {
        name: 'amount',
        label: 'Amount',
        desc: 'The amount of token you want to swap',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'tokenInAddress',
        label: 'Token In Address',
        desc: 'The address of the token you want to swap',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'WBTC',
            value: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
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
