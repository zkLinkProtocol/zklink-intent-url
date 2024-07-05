import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { RegisteredActionsProvider } from './adapter.provider';

@Module({
  controllers: [ActionsController],
  providers: [RegisteredActionsProvider, ActionsService],
})
export class ActionsModule {}
