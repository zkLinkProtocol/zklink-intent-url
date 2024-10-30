import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { BuyNftMagicEdenService } from './buy-nft-magic-eden.service';

@Module({
  imports: [SharedModule],
  providers: [BuyNftMagicEdenService],
  exports: [BuyNftMagicEdenService],
})
export class BuyNftMagicEdenModule {}
