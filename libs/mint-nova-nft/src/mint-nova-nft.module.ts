import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { MintNovaNftService } from './mint-nova-nft.service';

@Module({
  imports: [SharedModule],
  providers: [MintNovaNftService],
  exports: [MintNovaNftService],
})
export class MintNovaNftModule {}
