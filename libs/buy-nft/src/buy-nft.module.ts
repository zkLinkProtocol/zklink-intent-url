import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { BuyNftService } from './buy-nft.service';

@Module({
  imports: [SharedModule],
  providers: [BuyNftService],
  exports: [BuyNftService],
})
export class BuyNftModule {}
