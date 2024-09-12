import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const PUMP_FUN_FACTORY_ADDRESS =
  '0x7f19656b47F3878c176e2A18cfF962c35240c5BD';

export const metadata: ActionMetadata<FormName> = {
  title: 'PumpFun',
  description:
    '<div>PumpFun is a platform for creating and participating in token pump events</div>',
  logo: 'https://placehold.co/40x40',
  networks: [
    {
      name: 'zkLink Nova sepolia',
      chainId: '810181',
      contractAddress: '0x',
    },
  ],
  dApp: { name: 'PumpFun' },
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
      },
    ],
  },
};
