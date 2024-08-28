import { ActionMetadata } from 'src/common/dto';

import { Value } from './config';
import {
  DistributionModeValue,
  DistributionTokenValue,
  GasTokenValue,
} from './type';

export const genMetadata = (configValue: Value): ActionMetadata => ({
  title: 'RedEnvelope',
  description: 'Send red Envelope',
  networks: [
    {
      name: 'zkLink Nova',
      chainId: configValue.chainId.toString(),
      contractAddress: '',
    },
  ],
  dApp: { name: 'RedEnvelope' },
  author: { name: 'zkLink' },
  intent: {
    components: [
      {
        name: 'distributionMode',
        label: 'Distribution Mode',
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
        label: 'Total Distribution Amount',
        desc: 'Total amount you want to distribute',
        type: 'input',
        regex: '^[1-9]\\d*$',
        regexDesc: 'Int',
      },
      {
        name: 'distributionToken',
        label: 'Distribution Token',
        desc: 'Choose a token to distribute',
        type: 'searchSelectErc20',
        regex: '^0x[a-fA-F0-9]{40}$',
        regexDesc: 'Address',
        options: [
          {
            label: 'ETH',
            value: DistributionTokenValue.ETH,
          },
          {
            label: 'USDC',
            value: DistributionTokenValue.USDC,
          },
          {
            label: 'USDT',
            value: DistributionTokenValue.USDT,
          },
          {
            label: 'DAI',
            value: DistributionTokenValue.DAI,
          },
        ],
      },
      {
        name: 'amountOfRedEnvelopes',
        label: 'Amount Of Red Envelopes',
        desc: 'How many Red Envelopes want to distribute',
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
