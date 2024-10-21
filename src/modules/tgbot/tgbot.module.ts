import { Module } from '@nestjs/common';

import {
  ActionRepository,
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRecordTxRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { TgbotController } from './tgbot.controller';
import { TgbotService } from './tgbot.service';
import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';
import { IntentionRecordService } from '../actionUrl/intentionRecord.service';
import { CoingeckoService } from '../coingecko/coingecko.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [
    IntentionRepository,
    CreatorRepository,
    IntentionRecordRepository,
    IntentionRecordTxRepository,
    TgbotService,
    ActionUrlService,
    IntentionRecordService,
    ActionRepository,
    BlinkService,
    CoingeckoService,
  ],
  exports: [TgbotService],
  controllers: [TgbotController],
})
export class TgbotModule {}
