import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import { METADATA } from './config';
import { intoParams } from './interface';

// This is an example of a simple action that sends ETH to a recipient.
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

    // This is the real transaction object that will be sent to the blockchain.
    const rawTx = {
      chainId: 810180, // zkLink
      to: params.recipient,
      value: params.value.toString(),
      data: '0x',
    };

    // We append some extra information to the transaction object, for frontend display and decide to send.
    const tx: Tx = {
      ...rawTx,
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
