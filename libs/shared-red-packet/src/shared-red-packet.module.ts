import { Module } from '@nestjs/common';

import { DataModule } from '@core/data';

import { SharedRedPacketService } from './shared-red-packet.service';

@Module({
  imports: [DataModule],
  providers: [SharedRedPacketService],
  exports: [SharedRedPacketService],
})
export class SharedRedPacketModule {}
