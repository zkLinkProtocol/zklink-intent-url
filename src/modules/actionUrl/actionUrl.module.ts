import { Logger, Module } from '@nestjs/common';

import { ActionModule } from 'src/modules/action/action.module';
import {
  ActionRepository,
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';
import { IntentionRecordService } from './intentionRecord.service';

@Module({
  imports: [UnitOfWorkModule, ActionModule, ActionRepository],
  controllers: [ActionUrlController],
  providers: [
    Logger,
    ActionUrlService,
    IntentionRecordService,
    IntentionRepository,
    IntentionRecordRepository,
  ],
})
export class ActionUrlModule {}
