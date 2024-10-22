import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { SharedModule } from '@core/shared';
import {
  ActionRepository,
  CommissionRepository,
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRecordTxRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';
import { BlinkService } from './blink.service';
import { CommissionService } from './commission.service';
import { IntentionRecordService } from './intentionRecord.service';

@Module({
  imports: [UnitOfWorkModule, SharedModule],
  controllers: [ActionUrlController],
  providers: [
    CreatorRepository,
    ActionRepository,
    ActionUrlService,
    BlinkService,
    Logger,
    IntentionRecordService,
    CommissionRepository,
    CommissionService,
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
