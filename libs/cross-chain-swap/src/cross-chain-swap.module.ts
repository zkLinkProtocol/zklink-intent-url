import { Module } from '@nestjs/common';

import { CrossChainSwapService } from './cross-chain-swap.service';

@Module({
  imports: [],
  providers: [CrossChainSwapService],
  exports: [CrossChainSwapService],
})
export class CrossChainSwapModule {}
