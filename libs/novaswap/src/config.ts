import { ActionMetadata } from 'src/common/dto';

import { FormName } from './types';

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x0c283f1a3C6981eE623cb4E8AcC4f450f39D0815';
export const QUOTER_CONTRACT_ADDRESS =
  '0xa73A1d496dd147e68F557Dd73A28Ad6330777350';
export const SWAP_ROUTER_CONTRACT_ADDRESS =
  '0x2c98143431993e4CBD5eFD4B93c099432cacEBcE';
export const RPC_URL = 'https://sepolia.rpc.zklink.io';
export const FEE = 3000; // fee level, 0.3% fee is 3000

export const METADATA: ActionMetadata<FormName> = {
  title: 'Buy the dip!!!',
  description:
    'This action is design to allow you to create token swap on [Novaswap](https://novaswap.fi/)',
  networks: [
    {
      name: 'zkLink Nova',
      chainId: '810180',
    },
  ],
  author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
  magicLinkMetadata: {
    description: 'Now’s the perfect moment to buy the dip!!!',
  },
  intent: {
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
        desc: 'The amount of tokens you want to swap',
        type: 'input',
        regex: '^[0-9]+$',
        regexDesc: 'Must be a number',
        defaultValue: '1000000',
      },
    ],
  },
};
