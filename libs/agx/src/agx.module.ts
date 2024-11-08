import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { AgxService } from './agx.service';

@Module({
  imports: [SharedModule],
  providers: [AgxService],
  exports: [AgxService],
})
export class AgxModule {}
