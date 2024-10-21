import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { NovaswapService } from './novaswap.service';

@Module({
  imports: [SharedModule],
  providers: [NovaswapService],
  exports: [NovaswapService],
})
export class NovaswapModule {}
