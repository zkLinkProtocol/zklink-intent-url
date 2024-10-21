import { Chains } from 'src/constants';

export const apiConfig: { [key in Chains]?: string } = {
  [Chains.EthereumMainnet]:
    'https://api-mainnet.magiceden.dev/v3/rtp/ethereum/',
  [Chains.Base]: 'https://api-mainnet.magiceden.dev/v3/rtp/base/',
  [Chains.ArbitrumOne]: 'https://api-mainnet.magiceden.dev/v3/rtp/arbitrum/',
};
