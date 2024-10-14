import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const PRE_SALE_ADDRESS = '0x751DdB176ff6dcedBE954452966772e96342D80B';
export const CHAIN_ID = 810181;
export const metadata: ActionMetadata<FieldTypes> = {
  title: 'PreSale',
  description:
    '<div>PreSale is a platform for participating in token presales.</div>',
  networks: [
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
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
