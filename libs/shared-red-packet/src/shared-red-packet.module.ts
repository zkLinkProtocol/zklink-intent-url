import { Module } from '@nestjs/common';

import { SharedRedPacketService } from './shared-red-packet.service';
import { DataModule } from '../../data/src/data.module';

@Module({
  imports: [DataModule],
  providers: [SharedRedPacketService],
  exports: [SharedRedPacketService],
})
export class SharedRedPacketModule {}
