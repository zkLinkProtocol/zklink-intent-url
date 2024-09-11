import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const metadata: ActionMetadata<FormName> = {
  title: 'Buy NFT',
  description:
    '<div>This action allows you to create a Magic Link to buy NFT through Magic Eden API</div>',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
    {
      name: 'Sepolia',
      chainId: '11155111',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'Buy NFT' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    description:
      'Magic Link Enthusiast | Donate with your love for zkLink magic',
  },
  intent: {
    components: [
      {
        name: 'queryType',
        label: 'NFT Query Type',
        desc: 'Specify how to find the NFT',
        type: 'searchSelect',
        regex: '^[a-zA-Z]+$',
        regexDesc: 'Query Type',
        options: [
          {
            label: 'NFT Name',
            value: 'name',
          },
          {
            label: 'Slug Name',
            value: 'slug',
          },
          {
            label: 'NFT ID',
            value: 'id',
          },
          {
            label: 'Collection Set',
            value: 'collectionsSetId',
          },
          {
            label: 'Community',
            value: 'community',
          },
          {
            label: 'Contract Address',
            value: 'contract',
          },
        ],
      },
      {
        name: 'queryValue',
        label: 'NFT Query Value',
        desc: 'Specify how to find the NFT',
        type: 'input',
        regex: '^.+$',
        regexDesc: 'Query Value',
      },
    ],
  },
};

export const apiConfig: { [key in number]: string } = {
  1: 'https://api.reservoir.tools/',
  11155111: 'https://api-sepolia.reservoir.tools/',
};
