import { Module } from '@nestjs/common';

import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { SharedRedPacketService } from './shared-red-packetservice';

@Module({
  imports: [ActionUrlModule],
  providers: [SharedRedPacketService],
  exports: [SharedRedPacketService],
})
export class SharedRedPacketModule {}
