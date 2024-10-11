import { Module } from '@nestjs/common';

import { SharedModule } from '@core/shared';
import { TgbotModule } from 'src/modules/tgbot/tgbot.module';

import { SharedRedPacketService } from './shared-red-packet.service';

@Module({
  imports: [SharedModule, TgbotModule],
  providers: [SharedRedPacketService],
  exports: [SharedRedPacketService],
})
export class SharedRedPacketModule {}
