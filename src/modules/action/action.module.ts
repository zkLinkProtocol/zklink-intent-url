import { Global, Module, OnModuleInit } from '@nestjs/common';

import { Action, ActionId } from 'src/common/dto';

import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { registeredActions } from './registeredActions';

@Global()
@Module({
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule implements OnModuleInit {
  private readonly actionModules = registeredActions;

  constructor(private readonly actionStoreService: ActionService) {}

  async onModuleInit() {
    const actions = new Map<ActionId, Action>();
    this.actionModules.forEach((item) => {
      actions.set(item.key, item.module);
    });

    this.actionStoreService.setActions(actions);
  }
}
