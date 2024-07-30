import { Injectable } from '@nestjs/common';

import { Action, ActionId, GeneratedTransaction } from 'src/common/dto';
import { BusinessException } from 'src/exception/business.exception';

import { ActionResponseDto } from './dto/actions.dto';

@Injectable()
export class ActionService {
  private actions: Map<ActionId, Action> = new Map();

  setActions(actions: Map<ActionId, Action>) {
    this.actions = actions;
  }

  async getActions(): Promise<ActionResponseDto[]> {
    const actions = Array.from(this.actions.keys()).map(async (id) => {
      const action = this.actions.get(id);
      const metadata = await action.getMetadata();
      return { id, ...metadata };
    });
    return Promise.all(actions);
  }

  async getAction(id: ActionId): Promise<ActionResponseDto | null> {
    const action = this.actions.get(id);
    if (!action) {
      return null;
    }
    const metadata = await action.getMetadata();
    return action ? { id, ...metadata } : null;
  }

  async generateTransaction(
    id: ActionId,
    params: { [key: string]: any },
  ): Promise<GeneratedTransaction> {
    const action = this.actions.get(id);
    if (!action) {
      throw new BusinessException(`Action with id '${id}' not found.`);
    }
    return action.generateTransaction(params);
  }
}
