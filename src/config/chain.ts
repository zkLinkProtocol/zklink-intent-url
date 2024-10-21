import { Chains } from 'src/constants';

export const chainConfig: Array<{
  chainId: number;
  name: string;
  rpc: string[];
  explorer: string;
}> = [
  {
    chainId: Chains.EthereumMainnet,
    name: 'Ethereum Mainnet',
    rpc: ['https://eth.llamarpc.com'],
    explorer: 'https://etherscan.io',
  },
  {
    chainId: Chains.OpMainnet,
    name: 'Op Mainnet',
    rpc: ['https://optimism.llamarpc.com'],
    explorer: 'https://optimistic.etherscan.io',
  },
  {
    chainId: Chains.Base,
    name: 'Base',
    rpc: ['https://base.llamarpc.com'],
    explorer: 'https://basescan.org',
  },
  {
    chainId: Chains.ArbitrumOne,
    name: 'Arbitrum One',
    rpc: ['https://arbitrum.llamarpc.com'],
    explorer: 'https://arbiscan.io',
  },
  {
    chainId: Chains.ZkLinkNova,
    name: 'zkLink Nova',
    rpc: ['https://rpc.zklink.io'],
    explorer: 'https://explorer.zklink.io',
  },
  {
    chainId: Chains.ZkLinkNovaSepolia,
    name: 'zkLink Nova Sepolia',
    rpc: ['https://sepolia.rpc.zklink.io'],
    explorer: 'https://sepolia.explorer.zklink.io',
  },
  {
    chainId: Chains.ZklinkDev,
    name: 'zkLink dev',
    rpc: ['http://3.112.15.165:3050'],
    explorer: 'http://3.112.15.165:3050', // no browser
  },
  {
    chainId: Chains.BaseSepolia,
    name: 'Base Sepolia',
    rpc: ['https://sepolia.base.org'],
    explorer: 'https://base-sepolia.blockscout.com',
  },
  {
    chainId: Chains.ArbitrumSepolia,
    name: 'Arbitrum Sepolia',
    rpc: ['https://arbitrum-sepolia.gateway.tenderly.co'],
    explorer: 'https://sepolia.arbiscan.io',
  },
  {
    chainId: Chains.Linea,
    name: 'Linea',
    rpc: ['https://rpc.linea.build'],
    explorer: 'https://lineascan.build',
  },
  {
    chainId: Chains.MantaPacificMainnet,
    name: 'Manta Pacific Mainnet',
    rpc: ['https://pacific-rpc.manta.network/http'],
    explorer: 'https://pacific-explorer.manta.network',
  },

  {
    chainId: Chains.ScrollMainnet,
    name: 'Scroll Mainnet',
    rpc: ['https://rpc.scroll.io'],
    explorer: 'https://scrollscan.com',
  },
  {
    chainId: Chains.ZkSync,
    name: 'ZKsync',
    rpc: ['https://mainnet.era.zksync.io'],
    explorer: 'https://explorer.zksync.io',
  },
  {
    chainId: Chains.Mantle,
    name: 'Mantle',
    rpc: ['https://rpc.mantle.xyz', 'https://mantle.drpc.org'],
    explorer: 'https://explorer.mantle.xyz',
  },
];
