import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import {
  FEE,
  METADATA,
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
  async getMetadata() {
    return METADATA;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const tx = await novaswap.swapToken(data, FEE);
    return tx;
  }
}
