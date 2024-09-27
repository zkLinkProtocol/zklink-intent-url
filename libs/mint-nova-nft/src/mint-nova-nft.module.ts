import { DataModule } from '@core/data';
import { Module } from '@nestjs/common';

import { MintNovaNftService } from './mint-nova-nft.service';

@Module({
  imports: [DataModule],
  providers: [MintNovaNftService],
  exports: [MintNovaNftService],
})
export class MintNovaNftModule {}
