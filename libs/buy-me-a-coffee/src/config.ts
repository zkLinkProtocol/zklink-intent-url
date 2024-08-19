import { ActionMetadata } from 'src/common/dto';

export const METADATA: ActionMetadata = {
  title: 'Buy Me a Coffee',
  description: 'Support the works you love',
  logo: '',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
    {
      name: 'Arbitrum',
      chainId: '42161',
      contractAddress: '0x',
    },
    {
      name: 'zkLink Nova',
      chainId: '810180',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'Buy Me a Coffee' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'value',
        label: 'Amount',
        desc: 'The amount to sponsor',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: 'The address that is sponsored',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
