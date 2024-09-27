import { Module } from '@nestjs/common';

import { MintNovaNftService } from './mint-nova-nft.service';
import { DataModule } from '../../data/src/data.module';

@Module({
  imports: [DataModule],
  providers: [MintNovaNftService],
  exports: [MintNovaNftService],
})
export class MintNovaNftModule {}
