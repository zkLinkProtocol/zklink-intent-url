import { ActionMetadata } from 'src/common/dto';

export const RPC_URL: { [key: string]: string } = {
  '42161':
    'https://arb-mainnet.g.alchemy.com/v2/I-ZVEdUQy4Mk3rwbsNAIp_MVql6coseO',
};

export const TOKEN_CONFIG: { [key: string]: { [key: string]: string } } = {
  42161: {
    weth: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    wbtc: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    usdt: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    usdc: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  },
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
        name: 'amountToBuy',
        label: 'Amount to Buy',
        desc: 'The amount of input tokens used to buy output tokens',
        type: 'input',
        regex: '^[0-9]+(.[0-9]+)?$',
        regexDesc: 'Positive number',
      },
      {
        name: 'tokenIn',
        label: 'Token In ',
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
