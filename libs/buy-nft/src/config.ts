import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const metadata: ActionMetadata<FormName> = {
  title: 'Buy NFT from Magic Eden',
  description: '<div>This action allows you to buy NFT from Magic Eden</div>',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
    // {
    //   name: 'Sepolia',
    //   chainId: '11155111',
    //   contractAddress: '0x',
    // },
  ],
  dApp: { name: 'Buy NFT' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    description: '',
  },
  intent: {
    components: [
      {
        name: 'queryType',
        label: 'NFT Query Method',
        desc: 'Specify how to find the NFT',
        type: 'searchSelect',
        regex: '^[a-zA-Z]+$',
        regexDesc: 'NFT Query Method',
        options: [
          {
            label: 'Magic Eden Collection URL',
            value: 'link',
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
        desc: 'Enter the contract address or URL (e.g., https://magiceden.io/collections/ethereum/cryptopunks)',
        type: 'input',
        regex:
          '^(0x[a-fA-F0-9]{40}(:d+)?)|(https?://magiceden..+/collections/ethereum/.+)$',
        regexDesc: 'NFT Query Value',
      },
    ],
  },
};

export const apiConfig: { [key in number]: string } = {
  1: 'https://api-mainnet.magiceden.dev/v3/rtp/ethereum/',
  // 11155111: 'https://api-sepolia.reservoir.tools/',
};
