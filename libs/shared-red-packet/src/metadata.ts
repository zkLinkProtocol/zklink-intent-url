import { ActionMetadata } from 'src/common/dto';

import { Value } from './config';
import { DistributionModeValue, FieldTypes, GasTokenValue } from './type';

export const genMetadata = (
  configValue: Value,
): ActionMetadata<FieldTypes> => ({
  title: 'Shared Red Packet 🧧',
  description: '<div>This action is designed to distribute token rewards</div>',
  networks: [
    {
      name: configValue.networkName,
      chainId: configValue.chainId.toString(),
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    title: 'Shared Red Packet 🧧',
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
        regexDesc: 'It should be a valid number',
      },
      {
        name: 'distributionToken',
        label: 'Token to Distribute',
        desc: 'Choose a token to distribute',
        type: 'input',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Invalid address',
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
        desc: 'Gas Token',
        type: 'searchSelect',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'String',
        options: [
          {
            label: 'Recipient',
            value: GasTokenValue.Eth,
          },
        ],
      },
      {
        name: 'isInvitable',
        label: 'whether to give a commission to the inviter',
        desc: 'When this switch is turned on, users who share the Magic Link will receive a portion of the recipient’s red envelope reward.',
        type: 'switch',
        regex: '',
        regexDesc: '',
      },
    ],
  },
});
