import { readdirSync } from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';
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

  get(id: ActionId): Action | undefined {
    return this.actions[id];
  }

  getAll(): { [id: ActionId]: Action } {
    return { ...this.actions };
  }
}

const logger = new Logger('adapter');

export function loadActions(): RegisteredActions {
  function isAction(obj: any): obj is Action {
    return (
      typeof obj.getMetadata === 'function' &&
      typeof obj.generateTransaction === 'function' &&
      typeof obj.postTransaction === 'function'
    );
  }

  const actions = new RegisteredActions();
  const actionImplPath = join(__dirname, '..', 'action-impl');
  const dirs = readdirSync(actionImplPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const dir of dirs) {
    const module = require(join(actionImplPath, dir, 'index'));
    if (module.default && isAction(module.default)) {
      actions.register(dir, module.default);
      logger.log(`Loaded action "${dir}"`);
    }
  }

  return actions;
}

const registeredActions = loadActions();
export { registeredActions };
