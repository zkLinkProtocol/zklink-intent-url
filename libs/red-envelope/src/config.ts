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

type Config = typeof configuration;

export type Value = Config[keyof Config];
