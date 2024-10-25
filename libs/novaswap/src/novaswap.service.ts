import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import {
  FEE,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  RPC_URL,
  SWAP_ROUTER_CONTRACT_ADDRESS,
} from './config';
import { NovaSwap } from './swap';
import { FieldTypes } from './types';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const novaswap = new NovaSwap(
  provider,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
);

@RegistryPlug('novaswap', 'v1')
@Injectable()
export class NovaswapService extends ActionDto<FieldTypes> {
  constructor(private readonly chainService: ChainService) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Novaswap',
      description:
        '<div>This action is designed to allow you to create token swap on <a href="https://novaswap.fi">https://novaswap.fi</a></div>',
      networks: this.chainService.buildSupportedNetworks([Chains.ZkLinkNova]),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {
        title: 'Buy the dip!!!',
        description: 'Now’s the perfect moment to buy the dip!!!',
      },
      intent: {
        binding: 'amountIn',
        components: [
          {
            name: 'tokenInAddress',
            label: 'From Token',
            desc: 'The amount of tokens to spend',
            type: 'searchSelect',
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
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const tx = await novaswap.swapToken(data, FEE);
    return { transactions: tx };
  }
}
