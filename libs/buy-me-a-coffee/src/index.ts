import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import { METADATA } from './config';
import { intoParams } from './interface';

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(
    _params: ActionTransactionParams,
  ): Promise<GeneratedTransaction> {
    const params = intoParams(_params);

    const tx: Tx = {
      chainId: 810180, // zkLink
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
