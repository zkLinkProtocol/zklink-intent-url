import { Module } from '@nestjs/common';

import { BuyNftService } from './buy-nft.service';

@Module({
  providers: [BuyNftService],
  exports: [BuyNftService],
})
export class BuyNftModule {}
