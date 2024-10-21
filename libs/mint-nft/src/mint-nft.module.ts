import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { MintNftService } from './mint-nft.service';

@Module({
  imports: [SharedModule],
  providers: [MintNftService],
  exports: [MintNftService],
})
export class MintNftModule {}
