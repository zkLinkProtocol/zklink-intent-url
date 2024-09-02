import { Injectable } from '@nestjs/common';

import { RegistryPlug } from '@action/registry';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import { metadata } from './config';
import { intoParams } from './interface';

@RegistryPlug('split-bill', 'v1')
@Injectable()
export class SplitBillService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return metadata;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params: _params } = data;
    const params = intoParams(_params);

    const tx: Tx = {
      chainId: params.chainId,
      to: params.recipient,
      value: params.value.toString(),
      data: '0x',
      dataObject: {
        Token: params.token.toString,
        'Sent TOKEN': params.value.toString(),
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