import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { CrossChainSwapService } from './cross-chain-swap.service';

@Module({
  imports: [SharedModule],
  providers: [CrossChainSwapService],
  exports: [CrossChainSwapService],
})
export class CrossChainSwapModule {}
