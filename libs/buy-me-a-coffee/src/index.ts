import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import { metadata } from './config';

@RegistryPlug('buy-me-a-coffee', 'v1')
@Injectable()
export class BuyMeACoffeeService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return metadata;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params } = data;

    const tx: Tx = {
      chainId: params.chainId,
      to: params.recipient,
      value: params.value.toString(),
      data: '0x',
      dataObject: {
        Token: params.token.toString(),
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
