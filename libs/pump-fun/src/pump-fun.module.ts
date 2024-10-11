import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { PumpFunService } from './pump-fun.service';

@Module({
  imports: [SharedModule],
  providers: [PumpFunService],
  exports: [PumpFunService],
})
export class PumpFunModule {}
