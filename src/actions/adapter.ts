import { Action } from './interface';

export type ActionId = string;

export class RegisteredActions {
  private actions: { [id: ActionId]: Action } = {};

  register(id: ActionId, action: Action): void {
    if (this.actions.hasOwnProperty(id)) {
      throw new Error(`Action with id '${id}' already exists.`);
    }
    this.actions[id] = action;
  }

  get(id: string): Action | undefined {
    return this.actions[id];
  }

  getAll(): { [id: string]: Action } {
    return { ...this.actions };
  }
}

export const registeredActions = new RegisteredActions();
