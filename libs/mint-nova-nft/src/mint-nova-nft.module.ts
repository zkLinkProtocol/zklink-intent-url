import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { MintNovaNftService } from './mint-nova-nft.service';

@Module({
  imports: [ActionUrlModule],
  providers: [MintNovaNftService],
  exports: [MintNovaNftService],
})
export class MintNovaNftModule {}
