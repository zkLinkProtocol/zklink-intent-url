import { Chains } from 'src/constants';

export const configuration = {
  dev: {
    chainId: Chains.ZkLinkNovaSepolia,
    redPacketContractAddress: '0xDD7F313c278fD66B5626D997582e24E1b1e36cAC',
    magicLinkUrl: 'https://magic-test.zklink.io/intent',
  },
  prod: {
    chainId: Chains.ZkLinkNova,
    redPacketContractAddress: '0xcD894D074d2fB4B4F031AE06db2850B0903a39E1',
    magicLinkUrl: 'https://magic.zklink.io/intent',
  },
};

export type TransactionResult = {
  recipient: string;
  symbol: string;
  amount: string;
  txhash: string;
  chainId: number;
};

type Config = typeof configuration;

export type Value = Config[keyof Config];
