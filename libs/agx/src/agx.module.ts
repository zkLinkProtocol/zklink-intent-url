import { Module } from '@nestjs/common';

import { AgxService } from './agx.service';

@Module({
  providers: [AgxService],
  exports: [AgxService],
})
export class AgxModule {}
