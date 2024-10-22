import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { MagicSwapService } from './magic-swap.service';
@Module({
  imports: [SharedModule],
  providers: [MagicSwapService],
  exports: [MagicSwapService],
})
export class MagicSwapModule {}
