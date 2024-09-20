import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'Mint NFT',
  description: '<div>This action allows you to mint NFT</div>',
  networks: [
    {
      name: 'zkLink Nova',
      chainId: '810180',
    },
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    title: 'Mint NFT',
    description:
      'Magic Link Enthusiast | Donate with your love for zkLink magic',
  },
  intent: {
    components: [
      {
        name: 'contract',
        label: 'NFT Contract Address',
        desc: 'Enter the NFT contract address',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
      {
        name: 'quantity',
        label: 'Quantity',
        desc: "Quantity of NFTs to mint, leave it to 0 if the NFT contract don't support batch mint",
        type: 'input',
        regex: '^\\d+$',
        regexDesc: 'Quantity',
        defaultValue: '1',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
};
