import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { BuyNftOKXService } from './buy-nft-okx.service';

@Module({
  imports: [SharedModule],
  providers: [BuyNftOKXService],
  exports: [BuyNftOKXService],
})
export class BuyNftOKXModule {}
