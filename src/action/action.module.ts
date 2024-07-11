import { Module, OnModuleInit } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Action, ActionId } from 'src/common/interfaces';

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule implements OnModuleInit {
  constructor(private readonly actionStoreService: ActionService) {}

  async onModuleInit() {
    const actions = new Map<ActionId, Action>();
    const actionsPath = join(__dirname, '..', 'builders');

    const dirs = readdirSync(actionsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const dir of dirs) {
      const module = await import(join(actionsPath, dir, 'index'));
      if (module.default) {
        actions.set(dir, module.default);
      }
    }

    this.actionStoreService.setActions(actions);
  }
}
