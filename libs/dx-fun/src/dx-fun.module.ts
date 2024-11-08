import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { DxFunService } from './dx-fun.service';

@Module({
  imports: [SharedModule],
  providers: [DxFunService],
  exports: [DxFunService],
})
export class DxFunModule {}
