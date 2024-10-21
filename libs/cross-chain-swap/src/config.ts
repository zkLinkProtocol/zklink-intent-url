import { Address } from 'src/types';

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
