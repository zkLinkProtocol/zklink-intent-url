import { Inject, Injectable } from '@nestjs/common';
import { ActionId, RegisteredActions } from './adapter';
import { REGISTERED_ACTIONS } from './adapter.provider';
import { Transaction, TransactionRequest } from 'ethers';
import { ActionResponseDto } from './actions.dto';
import { GeneratedTransaction } from './interface';

@Injectable()
export class ActionsService {
  constructor(
    @Inject(REGISTERED_ACTIONS) private registeredActions: RegisteredActions,
  ) {}

  findAll(): ActionResponseDto[] {
    const actions = this.registeredActions.getAll();
    return Object.keys(actions).map((id) => {
      return new ActionResponseDto(id, actions[id].getMetadata());
    });
  }

  find(id: ActionId): ActionResponseDto | null {
    const action = this.registeredActions.get(id);
    return action ? new ActionResponseDto(id, action.getMetadata()) : null;
  }

  generateTransaction(
    id: ActionId,
    params: { [key: string]: any },
  ): GeneratedTransaction {
    const action = this.registeredActions.get(id);
    if (!action) {
      throw new Error(`Action with id '${id}' not found.`);
    }
    return action.generateTransaction(params);
  }
}
