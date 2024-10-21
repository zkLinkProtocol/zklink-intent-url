import { ActionMetadata } from 'src/common/dto';
export type FieldTypes = {
  amountToBuy: string;
  tokenFrom: string;
  tokenTo: string;
};
const ALCHEMY_API_KEY = '0cNsvrP9a82KWY24wOyUVpgKf8T7WJKQ';
export const RPC_URL = {
  '1': `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '42161': `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '10': `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '324': `https://zksync-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '59144': `https://linea-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '5000': `https://mantle-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '810': `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '534352': `https://scroll-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '169': `https://manta-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  '51': `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
};

export const METADATA: ActionMetadata<FieldTypes> = {
  title: 'Magic Swap',
  description: '<div>Perform news seamlessly across multiple networks</div>',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
    },
    {
      name: 'Arbitrum',
      chainId: '42161',
    },
    {
      name: 'Optimism',
      chainId: '10',
    },
    {
      name: 'Mantle',
      chainId: '5000',
    },
    {
      name: 'Base',
      chainId: '8453',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
  intent: {
    components: [
      {
        name: 'amountToBuy',
        label: 'Amount to Buy',
        desc: 'The amount of input tokens used to buy output tokens',
        type: 'input',
        regex: '^[0-9]+(.[0-9]+)?$',
        regexDesc: 'Positive number',
      },
      {
        name: 'tokenFrom',
        label: 'Token From ',
        desc: 'The token you want to swap',
        type: 'input',
        regex: '^.*$',
        regexDesc: 'Invalid Address',
      },
      {
        name: 'tokenTo',
        label: 'Token To',
        desc: 'The address of the token you want to receive',
        type: 'input',
        regex: '^.*$',
        regexDesc: 'Invalid Address',
      },
    ],
  },
  maxCommission: 0.03,
};
