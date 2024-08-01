import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';

import { METADATA } from './config';
import { ActionUrl } from 'src/entities/actionUrl.entity';

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async beforeActionUrlCreation(settings: object): Promise<any> {
    // todo
    // return create red enveiope transaction
    return { tx: null };
  }

  async afterActionUrlCreation(actionUrl: ActionUrl): Promise<void> {}

  async beforeActionUrlEdit(settings: object): Promise<void> {}

  async afterActionUrlEdit(actionUrl: ActionUrl): Promise<void> {}

  async beforeActionUrlDeletion(actionUrl: ActionUrl): Promise<void> {}

  async afterActionUrlDeletion(actionUrl: ActionUrl): Promise<void> {}

  async generateTransaction(
    params: ActionTransactionParams,
    actionUrl: ActionUrl,
  ): Promise<GeneratedTransaction> {
    // todo
    // 1. check: actionUrl.password == params.password
    // 2. params sign
    return {
      tx: null,
      shouldSend: true,
    };
  }
}

const action = new Action();
export default action;
