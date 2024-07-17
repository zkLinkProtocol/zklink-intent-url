import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';
import { Params } from './interface';
import {
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
  RPC_URL,
  METADATA,
} from './config';
import { NovaSwap } from './swap';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const novaswap = new NovaSwap(
  provider,
  POOL_FACTORY_CONTRACT_ADDRESS,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
);

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(params: {
    [key: string]: any;
  }): Promise<GeneratedTransaction> {
    const tx = await novaswap.swapToken(params as Params);
    return {
      tx: tx,
      shouldSend: true,
    };
  }
}

const action = new Action();
export default action;
