import { Injectable } from '@nestjs/common';
import { ActionResponseDto } from './dto/actions.dto';
import { Action, ActionId, GeneratedTransaction } from 'src/common/interfaces';

@Injectable()
export class ActionService {
  private actions: Map<ActionId, Action> = new Map();

  setActions(actions: Map<ActionId, Action>) {
    this.actions = actions;
  }

  getActions(): ActionResponseDto[] {
    console.log(Array.from(this.actions.keys()));
    return Array.from(this.actions.keys()).map((id) => {
      console.log(this.actions.get(id));
      return { id, ...this.actions.get(id).getMetadata() };
    });
  }

  getAction(id: ActionId): ActionResponseDto | null {
    const action = this.actions.get(id);
    return action ? { id, ...action.getMetadata() } : null;
  }

  generateTransaction(
    id: ActionId,
    params: { [key: string]: any },
  ): GeneratedTransaction {
    const action = this.actions.get(id);
    if (!action) {
      throw new Error(`Action with id '${id}' not found.`);
    }
    return action.generateTransaction(params);
  }
}
