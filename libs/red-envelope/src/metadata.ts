import { ActionMetadata } from 'src/common/dto';

import { Value } from './config';
import { DistributionModeValue, FormName, GasTokenValue } from './type';

export const genMetadata = (configValue: Value): ActionMetadata<FormName> => ({
  title: 'Red Packet 🧧',
  description: '<div>This action is designed to distribute token rewards</div>',
  networks: [
    {
      name: configValue.networkName,
      chainId: configValue.chainId.toString(),
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    title: 'Red Packet 🧧',
    description: 'Best wishes!',
  },
  intent: {
    binding: true,
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
        desc: 'The total amount of tokens to be distributed',
        type: 'input',
        regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
        regexDesc: 'Int',
      },
      {
        name: 'distributionToken',
        label: 'Token to Distribute',
        desc: 'Choose a token to distribute',
        type: 'searchSelect',
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
        label: 'Who should pay for the claiming gas fee',
        desc: 'Gas can be deducted from distributed amount, allowing recipient to grab red envelope with 0 gas',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'String',
        options: [
          {
            label: 'Recipient',
            value: GasTokenValue.Eth,
          },
          {
            label: 'Red Packet Creator (Requires additional tokens)',
            value: GasTokenValue.DistributedToken,
          },
        ],
      },
    ],
  },
});
