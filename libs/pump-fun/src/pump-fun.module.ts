import { DataModule } from '@core/data';
import { Module } from '@nestjs/common';

import { PumpFunService } from './pump-fun.service';

@Module({
  imports: [DataModule],
  providers: [PumpFunService],
  exports: [PumpFunService],
})
export class PumpFunModule {}
