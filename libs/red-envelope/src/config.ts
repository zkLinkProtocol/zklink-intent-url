import { DistributionTokenValue } from './type';

export const configuration = {
  dev: {
    chainId: 810181,
    networkName: 'zkLink Nova Sepolia',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0x2f7821161C6c11a473A6DC03896ea6BB5ac5Cb2F',
    paymasterContractAddress: '0x0a7f97fbF3cf238aAD21119CE70aB157CE11ce01',
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
    chainId: 810180,
    networkName: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0x583ba818E70418c99829F21Dce4A0A188bbc871F',
    paymasterContractAddress: '0x036CD64D20018148Df37C6ffDb971273EAC2E127',
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

export const providerConfig: { [key in number]: string } = {
  42161: 'https://arbitrum.llamarpc.com	',
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
  270: 'http://3.112.15.165:3050',
};

export const browserConfig: { [key in number]: string } = {
  42161: 'https://arbiscan.io/tx/',
  810180: 'https://explorer.zklink.io/tx/',
  810181: 'https://sepolia.explorer.zklink.io/tx/',
  270: 'http://3.112.15.165:3050',
};

export const feeMap: { [key in string]: number } = {
  [DistributionTokenValue.USDC]: 3000,
  [DistributionTokenValue.USDT]: 3000,
  [DistributionTokenValue.ZKL]: 10000,
};

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};

type Config = typeof configuration;

export type Value = Config[keyof Config];
