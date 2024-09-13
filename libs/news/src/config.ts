import { ActionMetadata } from 'src/common/dto';

export type FormName =
  | 'tokenInAddress'
  | 'tokenOutAddress'
  | 'amountIn'
  | 'recipient'
  | 'deadlineDurationInSec';

export const METADATA: ActionMetadata<FormName> = {
  title: 'Magic News',
  description: '<div>Perform news seamlessly across multiple networks</div>',
  networks: [
    {
      name: 'Arbitrum',
      chainId: '42161',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
  intent: {
    binding: 'amountIn',
    components: [
      {
        name: 'tokenInAddress',
        label: 'From Token',
        desc: 'The amount of tokens to spend',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'WETH',
            value: '0x6e42d10eB474a17b14f3cfeAC2590bfa604313C7',
            default: true,
          },
        ],
      },
      {
        name: 'tokenOutAddress',
        label: 'To Token',
        desc: 'The address of the token you want to receive',
        type: 'searchSelect',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'USDC',
            value: '0x461fE851Cd66e82A274570ED5767c873bE9Ae1ff',
            default: true,
          },
        ],
      },
      {
        name: 'amountIn',
        label: 'Amount',
        desc: 'The amount of tokens you pay',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
        defaultValue: '1',
      },
    ],
  },
};
