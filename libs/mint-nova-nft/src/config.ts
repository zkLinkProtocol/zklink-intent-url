import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'Mint Nova Cubo NFT',
  description: '<div>This action allows you to mint Nova Cubo NFT</div>',
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
        regexDesc: 'Invalid Address',
      },
      {
        name: 'stage',
        label: 'Mint Stage',
        desc: 'NFT Mint Stage',
        type: 'searchSelect',
        options: [
          {
            label: 'Whitelist Only',
            value: 'Allowlist',
          },
          {
            label: 'Public Mint',
            value: 'Public',
          },
        ],
      },
      {
        name: 'tokenId',
        label: 'Start Token ID',
        desc: 'Start Token ID',
        type: 'input',
        regex: '^\\d+$',
        regexDesc: 'Key',
        defaultValue: '10',
      },
      {
        name: 'fee',
        label: 'Transaction Value',
        desc: 'The NFT mint fee',
        type: 'input',
        regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
        regexDesc: 'Must be a number',
        defaultValue: '0.00001',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
};
