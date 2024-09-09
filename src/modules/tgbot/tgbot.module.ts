import { Module } from '@nestjs/common';

import { CreatorRepository, IntentionRepository } from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { TgbotController } from './tgbot.controller';
import { TgbotService } from './tgbot.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [IntentionRepository, CreatorRepository, TgbotService],
  controllers: [TgbotController],
})
export class TgbotModule {}
