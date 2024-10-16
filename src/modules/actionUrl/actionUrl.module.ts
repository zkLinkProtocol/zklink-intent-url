import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { SharedModule } from '@core/shared';
import {
  ActionRepository,
  IntentionRecordRepository,
  IntentionRecordTxRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';
import { BlinkService } from './blink.service';
import { IntentionRecordService } from './intentionRecord.service';

@Module({
  imports: [UnitOfWorkModule, SharedModule],
  controllers: [ActionUrlController],
  providers: [
    ActionRepository,
    ActionUrlService,
    BlinkService,
    Logger,
    IntentionRecordService,
    IntentionRepository,
    IntentionRecordRepository,
    IntentionRecordTxRepository,
  ],
  exports: [IntentionRecordService],
})
export class ActionUrlModule implements OnModuleInit {
  constructor(
    private readonly intentionRecordService: IntentionRecordService,
  ) {}
  async onModuleInit() {
    this.intentionRecordService.handleRecordTxsStatus();
  }
}
