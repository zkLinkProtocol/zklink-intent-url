import { Module } from '@nestjs/common';

import { SplitBillService } from './split-bill.service';
import { DataModule } from '../../data/src/data.module';

@Module({
  imports: [DataModule],
  providers: [SplitBillService],
  exports: [SplitBillService, DataModule],
})
export class SplitBillModule {}
