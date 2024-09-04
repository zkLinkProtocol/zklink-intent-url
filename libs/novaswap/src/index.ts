import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';

import {
  FEE,
  METADATA,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  RPC_URL,
  SWAP_ROUTER_CONTRACT_ADDRESS,
} from './config';
import { intoParams } from './interface';
import { NovaSwap } from './swap';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const novaswap = new NovaSwap(
  provider,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
);

@RegistryPlug('novaswap', 'v1')
@Injectable()
export class NovaswapService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params } = data;
    //TODO add referrer
    const tx = await novaswap.swapToken(intoParams(params), FEE, data.sender);
    return tx;
  }
}
