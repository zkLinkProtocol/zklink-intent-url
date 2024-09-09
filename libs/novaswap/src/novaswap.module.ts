import { Module } from '@nestjs/common';

import { NovaswapService } from './novaswap.service';

@Module({
  providers: [NovaswapService],
  exports: [NovaswapService],
})
export class NovaswapModule {}
