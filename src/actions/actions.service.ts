import { Inject, Injectable } from '@nestjs/common';
import { Action } from './interface';
import { ActionId, RegisteredActions } from './adapter';
import { REGISTERED_ACTIONS } from './adapter.provider';
import { Transaction } from 'ethers';

@Injectable()
export class ActionsService {
  constructor(
    @Inject(REGISTERED_ACTIONS) private registeredActions: RegisteredActions,
  ) {}

  findAll(): { [id: ActionId]: Action } {
    return this.registeredActions.getAll();
  }

  find(id: ActionId): Action {
    return this.registeredActions.get(id);
  }

  generateTransaction(id: ActionId, params: any[]): Transaction {
    const action = this.registeredActions.get(id);
    if (!action) {
      throw new Error(`Action with id '${id}' not found.`);
    }
    return action.generateTransaction(params);
  }

  postTransaction(id: ActionId, tx: Transaction): boolean {
    const action = this.registeredActions.get(id);
    if (!action) {
      throw new Error(`Action with id '${id}' not found.`);
    }
    return action.postTransaction(tx);
  }

}
