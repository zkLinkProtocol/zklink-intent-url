import { Module } from '@nestjs/common';

import {
  ActionRepository,
  CreatorRepository,
  IntentionRepository,
  MessagePollRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { TgbotController } from './tgbot.controller';
import { TgbotService } from './tgbot.service';
import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [
    IntentionRepository,
    CreatorRepository,
    TgbotService,
    ActionUrlService,
    ActionRepository,
    BlinkService,
    MessagePollRepository,
  ],
  exports: [TgbotService],
  controllers: [TgbotController],
})
export class TgbotModule {}
