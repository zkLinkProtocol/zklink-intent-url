import { ethers } from 'ethers';

import {
  Action as ActionDto,
  ActionMetadata,
  GeneratedTransaction,
} from 'src/common/dto';

import { METADATA, RPC_URL } from './config';
import { Params } from './interface';

const provider = new ethers.JsonRpcProvider(RPC_URL);

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(_params: {
    [key: string]: any;
  }): Promise<GeneratedTransaction> {
    const params = _params as Params;

    const tx = {
      value: params.value,
      to: params.recipient,
      data: '0x',
    };
    return {
      tx: tx,
      provider: provider,
      shouldSend: true,
    };
  }
}

const action = new Action();
export default action;
