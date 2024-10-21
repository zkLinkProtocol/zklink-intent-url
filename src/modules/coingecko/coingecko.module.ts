import { Module } from '@nestjs/common';

import { CoingeckoService } from './coingecko.service';

@Module({
  imports: [],
  providers: [CoingeckoService],
  exports: [CoingeckoService],
})
export class CoingeckoModule {}
