import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { BuyNftService } from './buy-nft.service';

@Module({
  imports: [ActionUrlModule],
  providers: [BuyNftService],
  exports: [BuyNftService],
})
export class BuyNftModule {}
