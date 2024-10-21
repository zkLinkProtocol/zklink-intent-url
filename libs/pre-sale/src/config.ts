import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const PRE_SALE_ADDRESSES = {
  810181: '0x751DdB176ff6dcedBE954452966772e96342D80B',
  8453: '0xa0cc66e64dA2B6BD5056D8697D079ccba1013b73',
  42161: '0x85BB43570655c8636Bdb9d6318b5440028656630',
  10: '0x263Ce73d5243A5192dAbc34BB20fe33dcCEE1fb7',
  5000: '0x263Ce73d5243A5192dAbc34BB20fe33dcCEE1fb7',
};

export const RPC_URLS = {
  810181: 'https://rpc.zklink.io/nova-sepolia',
  8453: 'https://base-mainnet.g.alchemy.com/v2/0cNsvrP9a82KWY24wOyUVpgKf8T7WJKQ',
  42161:
    'https://arb-mainnet.g.alchemy.com/v2/0cNsvrP9a82KWY24wOyUVpgKf8T7WJKQm',
  10: 'https://opt-mainnet.g.alchemy.com/v2/0cNsvrP9a82KWY24wOyUVpgKf8T7WJKQ',
  5000: 'https://mantle-mainnet.g.alchemy.com/v2/0cNsvrP9a82KWY24wOyUVpgKf8T7WJKQ',
};

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'PreSale',
  description:
    '<div>PreSale is a platform for participating in token presales.</div>',
  networks: [
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
    },
    {
      name: 'Base',
      chainId: '8453',
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
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
  intent: {
    components: [
      {
        name: 'tokenName',
        label: 'Token Name',
        desc: 'The name of the token',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Name',
      },
      {
        name: 'tokenSymbol',
        label: 'Token Symbol',
        desc: 'The symbol of the token',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Symbol',
      },
      {
        name: 'tokenMaxSupply',
        label: 'Max Supply',
        desc: 'The max supply of the token',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Max Supply',
      },
      {
        name: 'creatorAmount',
        label: 'Creator Amount',
        desc: 'The amount of tokens the creator will receive',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Creator Amount',
      },
      {
        name: 'price',
        label: 'Price',
        desc: 'The amount of ETH required to purchase one token',
        type: 'input',
        regex: '^[0-9]+(\\.[0-9]+)?$',
        regexDesc: 'Price',
      },
      {
        name: 'offerAmount',
        label: 'Offer Amount',
        desc: 'The amount of ETH the user wants to use to purchase tokens',
        type: 'input',
        regex: '^[0-9]+(\\.[0-9]+)?$',
        regexDesc: 'Offer Amount',
      },
    ],
  },
};
