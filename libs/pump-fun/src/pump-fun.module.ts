import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { PumpFunService } from './pump-fun.service';

@Module({
  imports: [ActionUrlModule],
  providers: [PumpFunService],
  exports: [PumpFunService, ActionUrlModule],
})
export class PumpFunModule {}
