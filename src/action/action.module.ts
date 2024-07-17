import { Module, OnModuleInit } from '@nestjs/common';

import * as novaSwapAction from '@action/novaswap';
import { Action, ActionId } from 'src/common/dto';

import { ActionController } from './action.controller';
import { ActionService } from './action.service';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule implements OnModuleInit {
  private readonly actionModules = [
    { key: 'novaswap', module: novaSwapAction.default },
  ];

  constructor(private readonly actionStoreService: ActionService) {}

  async onModuleInit() {
    const actions = new Map<ActionId, Action>();
    this.actionModules.forEach((item) => {
      actions.set(item.key, item.module);
    });

    this.actionStoreService.setActions(actions);
  }
}
