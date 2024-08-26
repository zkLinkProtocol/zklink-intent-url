import { Logger, Module } from '@nestjs/common';

import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionsJsonController } from './actionsJson.controller';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [ActionsJsonController],
  providers: [Logger],
})
export class ActionsJsonModule {
  constructor() {}
}
