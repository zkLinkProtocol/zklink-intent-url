import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { SplitBillService } from './split-bill.service';

@Module({
  imports: [SharedModule],
  providers: [SplitBillService],
  exports: [SplitBillService],
})
export class SplitBillModule {}
