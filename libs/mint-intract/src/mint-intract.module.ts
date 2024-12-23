import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { MintIntractService } from './mint-intract.service';

@Module({
  imports: [SharedModule],
  providers: [MintIntractService],
  exports: [MintIntractService],
})
export class MintIntractModule {}
