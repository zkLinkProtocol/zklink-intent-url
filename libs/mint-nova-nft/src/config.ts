import { ActionMetadata } from 'src/common/dto';

import { FieldTypes } from './types';

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'Mint Nova Genesis NFT',
  description: '<div>This action allows you to mint Nova Genesis NFT</div>',
  networks: [
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
        name: 'key',
        label: 'Private Key',
        desc: 'Private Key',
        type: 'input',
        regex: '^[a-f0-9]{64}$',
        regexDesc: 'Key',
      },
      {
        name: 'recipient',
        label: 'Recipient Address',
        desc: 'NFT recipient address',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
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
        defaultValue: '0.002',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  810181: 'https://sepolia.rpc.zklink.io',
};

export const contractConfig: { [key in number]: string } = {
  810181: '0x14BD2594aBbFEd161b365bD7855620d847D5D5c8',
};
