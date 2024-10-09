import { Module } from '@nestjs/common';

import { DataModule } from '@core/data';
import { TgbotModule } from 'src/modules/tgbot/tgbot.module';

import { SharedRedPacketService } from './shared-red-packet.service';

@Module({
  imports: [DataModule, TgbotModule],
  providers: [SharedRedPacketService],
  exports: [SharedRedPacketService],
})
export class SharedRedPacketModule {}
