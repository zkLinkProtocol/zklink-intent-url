import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { SplitBillService } from './split-bill.service';

@Module({
  imports: [ActionUrlModule],
  providers: [SplitBillService],
  exports: [SplitBillService, ActionUrlModule],
})
export class SplitBillModule {}
