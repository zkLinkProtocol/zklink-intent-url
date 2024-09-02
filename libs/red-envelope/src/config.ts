import { DistributionTokenValue } from './type';

export const configuration = {
  dev: {
    chainId: 810181,
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    wethAddress: '0x8280a4e7D5B3B658ec4580d3Bc30f5e50454F169',
    quoterContractAddress: '0x86Fc6ab84CFc6a506d51FC722D3aDe959599A98A',
    redPacketContractAddress: '0xD6D392794aDCA3d3EF300c3Cc99B8AfD89da2235',
    paymasterContractAddress: '0x8f283dEB6E1612fD016D139bAF465208402F9C3d',
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
    wethAddress: '',
    quoterContractAddress: '',
    redPacketContractAddress: '',
    paymasterContractAddress: '',
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
