import { DistributionTokenValue } from './type';

export const configuration = {
  dev: {
    chainId: 810181,
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0xf092A853a56D14137F4ccf8DEcA358576f682F8D',
    paymasterContractAddress: '0x60D176844F4E2173f6bc02b2FB9b1a853403536B',
    tokens: [
      {
        label: 'DTN',
        value: '0x8a183994392CDBb3e6451cFC8cC779f7b0e907BA',
      },
    ],
  },
  prod: {
    chainId: 810180,
    rpcUrl: 'https://rpc.zklink.io',
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0xf092A853a56D14137F4ccf8DEcA358576f682F8D',
    paymasterContractAddress: '0x60D176844F4E2173f6bc02b2FB9b1a853403536B',
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
        label: 'DAI',
        value: DistributionTokenValue.DAI,
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

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};

type Config = typeof configuration;

export type Value = Config[keyof Config];
