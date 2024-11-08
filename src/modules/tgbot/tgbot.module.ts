import { Module } from '@nestjs/common';

import { SharedModule } from '@core/shared';
import {
  ActionRepository,
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRecordTxRepository,
  IntentionRepository,
  TgGroupAndChannelRepository,
  TgMessageRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { AibotService } from './aibot.service';
import { FlashNewsBotService } from './flashNewsBot.service';
import { TgbotController } from './tgbot.controller';
import { TgbotService } from './tgbot.service';
import { ActionService } from '../action/action.service';
import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';
import { IntentionRecordService } from '../actionUrl/intentionRecord.service';
import { CoingeckoService } from '../coingecko/coingecko.service';

@Module({
  imports: [UnitOfWorkModule, SharedModule],
  providers: [
    IntentionRepository,
    CreatorRepository,
    IntentionRecordRepository,
    IntentionRecordTxRepository,
    TgbotService,
    ActionUrlService,
    ActionService,
    IntentionRecordService,
    ActionRepository,
    BlinkService,
    CoingeckoService,
    TgMessageRepository,
    TgGroupAndChannelRepository,
    FlashNewsBotService,
    AibotService,
  ],
  exports: [TgbotService, FlashNewsBotService],
  controllers: [TgbotController],
})
export class TgbotModule {}
