import { ActionMetadata, ConditionalComponentDto } from 'src/common/dto';

import { FieldTypes } from './types';
export const PUMP_FUN_FACTORY_ADDRESS =
  '0xb24848Eb0F6fb1F46615D8cc4b2644f02cde7d05';

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c283f1a3C6981eE623cb4E8AcC4f450f39D0815';
export const QUOTER_CONTRACT_ADDRESS =
  '0xa73A1d496dd147e68F557Dd73A28Ad6330777350';
export const SWAP_ROUTER_CONTRACT_ADDRESS =
  '0x2c98143431993e4CBD5eFD4B93c099432cacEBcE';

export const CHAIN_ID = 810181;
const orderType: ConditionalComponentDto<FieldTypes> = {
  name: 'orderType',
  label: 'Order Type',
  desc: 'The type of the order',
  type: 'conditionalSelect',
  regex: '^[a-zA-Z0-9]+$',
  regexDesc: 'Order Type',
  options: [
    { label: 'Buy', value: 'buy' },
    { label: 'Sell', value: 'sell' },
  ],
};

export const metadata: ActionMetadata<FieldTypes> = {
  title: 'PumpFun',
  description:
    '<div>PumpFun is a platform for creating and participating in token pump events</div>',
  networks: [
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {},
  intent: {
    components: [
      {
        name: 'tokenName',
        label: 'Token Name',
        desc: 'The name of the token',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Name',
      },
      {
        name: 'tokenSymbol',
        label: 'Token Symbol',
        desc: 'The symbol of the token',
        type: 'input',
        regex: '^[a-zA-Z0-9]+$',
        regexDesc: 'Token Symbol',
      },
      {
        name: 'creatorInitialBuyAmount',
        label: 'Creator Initial Buy Amount(in ETH)',
        desc: 'The amount of ETH you want to buy the token with',
        type: 'input',
        regex: '^[0-9]+(\\.[0-9]+)?$',
        regexDesc: 'Initial Buy Amount',
      },
      {
        name: 'buyAmount',
        label: 'Buy Amount (in ETH)',
        desc: 'The amount of ETH you want to buy the token with',
        type: 'input',
        regex: '^[0-9]+(\\.[0-9]+)?$',
        regexDesc: 'Buy Amount',
        conditionalRendering: {
          component: orderType,
          value: ['buy'],
        },
      },
      {
        name: 'sellPercent',
        label: 'Sell Percent',
        desc: 'The percentage of the token you want to sell',
        type: 'input',
        regex: '^(?:100|[1-9]?[0-9])$',
        regexDesc: 'Sell Percent',
        conditionalRendering: {
          value: ['sell'],
          component: orderType,
        },
      },
      orderType,
    ],
  },
};
