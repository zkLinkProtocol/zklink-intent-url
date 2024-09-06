import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const metadata: ActionMetadata<FormName> = {
  title: 'Buy NFT',
  description:
    'This action allows you to create a Magic Link to buy NFT through Magic Eden API',
  networks: [
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
        name: 'name',
        label: 'NFT Name',
        desc: 'The name of NFT',
        type: 'input',
        regex: '^.+$',
        regexDesc: 'Name',
      },
      {
        name: 'slug',
        label: 'NFT Slug Name',
        desc: 'The slug name of NFT',
        type: 'input',
        regex: '^.+$',
        regexDesc: 'Name',
      },
      {
        name: 'id',
        label: 'NFT Collection ID',
        desc: 'The collection id of NFT',
        type: 'input',
        regex: '^0x[a-fA-F0-9:]$',
        regexDesc: 'Address',
      },
    ],
  },
};
