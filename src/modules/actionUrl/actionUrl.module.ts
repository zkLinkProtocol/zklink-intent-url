import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { ActionModule } from 'src/modules/action/action.module';
import { IntentionRepository } from 'src/repositories/intention.repository';
import { IntentionRecordRepository } from 'src/repositories/intentionRecord.repository';
import { IntentionRecordTxRepository } from 'src/repositories/intentionRecordTx.repository';
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
    IntentionRecordTxRepository,
  ],
})
export class ActionUrlModule implements OnModuleInit {
  constructor(
    private readonly intentionRecordService: IntentionRecordService,
  ) {}
  async onModuleInit() {
    this.intentionRecordService.handleRecordTxsStatus();
  }
}
