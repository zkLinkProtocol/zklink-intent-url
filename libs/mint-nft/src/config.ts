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
        name: 'entrypoint',
        label: 'Mint Func',
        desc: 'Entry point of the mint function',
        type: 'input',
        regex: '^[a-zA-Z0-9$_]+$',
        regexDesc: 'Func',
        defaultValue: 'mint',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: "NFT recipient address, leave it to none if the NFT contract don't need it, leave it to sender for transaction sender",
        type: 'input',
        regex: '^(0x[a-fA-F0-9]{40})|(none)|(sender)$',
        regexDesc: 'Address',
        defaultValue: 'none',
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
      {
        name: 'ext',
        label: 'Extension Data',
        desc: "Extension metadata of the NFT, leave it to none if the NFT contract don't need it",
        type: 'input',
        regex: '^.*$',
        regexDesc: 'Quantity',
        defaultValue: 'none',
      },
      {
        name: 'value',
        label: 'Amount',
        desc: 'The NFT mint fee, leave it to 0 for free mint NFT',
        type: 'input',
        regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
        regexDesc: 'Must be a number',
        defaultValue: '0',
      },
    ],
  },
};

export const providerConfig: { [key in number]: string } = {
  810180: 'https://rpc.zklink.io',
  810181: 'https://sepolia.rpc.zklink.io',
};
