export const configuration = {
  dev: {
    chainId: 810181,
    networkName: 'zkLink Nova Sepolia',
    rpcUrl: 'https://sepolia.rpc.zklink.io',
    redPacketContractAddress: '0x70E17f5A10f88e8F40F602338a979635699EE5e5',
    magicLinkUrl: 'https://magic-test.zklink.io/intent',
    browserUrl: 'https://sepolia.explorer.zklink.io/tx/',
  },
  prod: {
    chainId: 810180,
    networkName: 'zkLink Nova',
    rpcUrl: 'https://rpc.zklink.io',
    redPacketContractAddress: '0x583ba818E70418c99829F21Dce4A0A188bbc871F',
    magicLinkUrl: 'https://magic.zklink.io/intent',
    browserUrl: 'https://explorer.zklink.io/tx/',
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
