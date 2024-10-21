import { Chains } from 'src/constants';

import { DistributionTokenValue } from './type';

export const configuration = {
  dev: {
    chainId: Chains.ZkLinkNovaSepolia,
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0x2f7821161C6c11a473A6DC03896ea6BB5ac5Cb2F',
    paymasterContractAddress: '0x0a7f97fbF3cf238aAD21119CE70aB157CE11ce01',
    browserUrl: 'https://sepolia.explorer.zklink.io/tx/',
    tokens: [
      {
        label: 'ETH',
        value: DistributionTokenValue.ETH,
      },
      {
        label: 'DTN',
        value: DistributionTokenValue.DTN,
      },
    ],
  },
  prod: {
    chainId: Chains.ZkLinkNova,
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0x6cd5E9a05dD9ef0c4C9F533eb9Df6044ecAf2297',
    paymasterContractAddress: '0x30A37F965cE59c28698292268fC2e7Df450cAca4',
    browserUrl: 'https://explorer.zklink.io/tx/',
    tokens: [
      {
        label: 'ETH',
        value: DistributionTokenValue.ETH,
      },
      {
        label: 'USDC',
        value: DistributionTokenValue.USDC,
      },
      {
        label: 'USDT',
        value: DistributionTokenValue.USDT,
      },
      {
        label: 'ZKL',
        value: DistributionTokenValue.ZKL,
      },
    ],
  },
};

export const feeMap: { [key in string]: number } = {
  [DistributionTokenValue.USDC]: 3000,
  [DistributionTokenValue.USDT]: 3000,
  [DistributionTokenValue.ZKL]: 10000,
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
