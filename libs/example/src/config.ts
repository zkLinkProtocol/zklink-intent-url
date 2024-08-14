import { ActionMetadata } from 'src/common/dto';

export const METADATA: ActionMetadata = {
  title: 'Example',
  description: 'Send ETH to someone',
  logo: '',
  networks: [
    {
      name: 'Ethereum',
      chainId: '1',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'An Example' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'value',
        label: 'Amount',
        desc: 'The amount to send',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
      },
      {
        name: 'recipient',
        label: 'Recipient',
        desc: 'The receiver address',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
      },
    ],
  },
};
