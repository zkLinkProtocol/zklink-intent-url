import { ActionMetadata } from 'src/common/dto';

import { Value } from './config';
import { DistributionModeValue, FormName, GasTokenValue } from './type';

export const genMetadata = (configValue: Value): ActionMetadata<FormName> => ({
  title: 'Red Packet 🧧',
  description: 'This action is designed to distribute token rewards',
  networks: [
    {
      name: 'zkLink Nova',
      chainId: configValue.chainId.toString(),
      contractAddress: '',
    },
  ],
  dApp: { name: 'Red Packet 🧧' },
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    description: 'Best wishes!',
  },
  intent: {
    components: [
      {
        name: 'distributionMode',
        label: 'Distribution Method',
        desc: 'Choose Mode to distribute Red Envelopes',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'String',
        options: [
          {
            label: 'Equal Amount Per Address',
            value: DistributionModeValue.EqualAmountPerAddress,
          },
          {
            label: 'Random Amount Per Address',
            value: DistributionModeValue.RandomAmountPerAddress,
          },
        ],
      },
      {
        name: 'totalDistributionAmount',
        label: 'Total Token Amount',
        desc: 'The total number of tokens to be distributed',
        type: 'input',
        regex: '^[1-9]\\d*$',
        regexDesc: 'Int',
      },
      {
        name: 'distributionToken',
        label: 'Token to Distribute',
        desc: 'Choose a token to distribute',
        type: 'searchSelectErc20',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: configValue.tokens,
      },
      {
        name: 'amountOfRedEnvelopes',
        label: 'Number of Red Packets',
        desc: 'Total number of Red Packets',
        type: 'input',
        regex: '^[1-9]\\d*$',
        regexDesc: 'Int',
      },
      {
        name: 'gasToken',
        label: 'Gas Token',
        desc: 'Gas can be deducted from distributed amount, allowing recipient to grab red envelope with 0 gas',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'String',
        options: [
          {
            label: 'ETH(Pay By Recipient)',
            value: GasTokenValue.Eth,
          },
          {
            label: 'Distributed Token(No Gas)',
            value: GasTokenValue.DistributedToken,
          },
        ],
      },
    ],
  },
});
