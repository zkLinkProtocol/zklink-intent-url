import { DataModule } from '@core/data';
import { Module } from '@nestjs/common';

import { SplitBillService } from './split-bill.service';

@Module({
  imports: [DataModule],
  providers: [SplitBillService],
  exports: [SplitBillService],
})
export class SplitBillModule {}
