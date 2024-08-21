import { Logger, Module } from '@nestjs/common';

import { ActionModule } from 'src/modules/action/action.module';
import { IntentionRepository } from 'src/repositories/intention.repository';
import { IntentionRecordRepository } from 'src/repositories/intentionRecord.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';
import { IntentionRecordService } from './intentionRecord.service';

@Module({
  imports: [UnitOfWorkModule, ActionModule],
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
