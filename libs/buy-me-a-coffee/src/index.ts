import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import { METADATA } from './config';
import { intoParams } from './interface';

class Action extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params: _params } = data;
    const params = intoParams(_params);

    const tx: Tx = {
      chainId: params.chainId, // zkLink
      to: params.recipient,
      value: params.value.toString(),
      data: '0x',
      dataObject: {
        'Sent ETH': params.value.toString(),
        To: params.recipient,
      },
      shouldSend: true,
    };
    return {
      txs: [tx],
      tokens: [],
    };
  }
}

const action = new Action();
export default action;
