import { Chains } from 'src/constants';

export const okxChainAlias: { [key in Chains]?: string } = {
  [Chains.EthereumMainnet]: 'eth',
  [Chains.ArbitrumOne]: 'arbitrum',
  [Chains.Base]: 'base',
  [Chains.BSCMainnet]: 'bsc',
  [Chains.OpMainnet]: 'optimism',
  [Chains.Linea]: 'linea',
  [Chains.MantaPacificMainnet]: 'manta-pacific',
  [Chains.ScrollMainnet]: 'scroll',
  [Chains.ZkSync]: 'zksync-era',
  [Chains.ZkLinkNova]: 'zkLink-Nova',
};

export const okxChainName: { [key in Chains]?: string } = {
  [Chains.EthereumMainnet]: 'Ethereum',
  [Chains.ArbitrumOne]: 'Arbitrum One',
  [Chains.Base]: 'BASE',
  [Chains.BSCMainnet]: 'BNB Chain',
  [Chains.OpMainnet]: 'Optimism',
  [Chains.Linea]: 'LINEA',
  [Chains.MantaPacificMainnet]: 'Manta Pacific',
  [Chains.ScrollMainnet]: 'Scroll',
  [Chains.ZkSync]: 'zkSync Era',
  [Chains.ZkLinkNova]: 'zkLink Nova',
};
