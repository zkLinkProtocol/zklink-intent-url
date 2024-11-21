import { Chains } from 'src/constants';

import { DistributionTokenValue } from './type';

export const configuration = {
  dev: {
    chainId: Chains.ZkLinkNovaSepolia,
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0x2897AB1D7DEbc60feAA1535F3Cb623f1D3579dB1',
    paymasterContractAddress: '0x8b030151d249fD6Df6cc31a7aB63B912130b84f4',
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
