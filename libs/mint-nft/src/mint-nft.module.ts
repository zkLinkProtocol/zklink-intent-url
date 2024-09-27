import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { MintNftService } from './mint-nft.service';

@Module({
  imports: [ActionUrlModule],
  providers: [MintNftService],
  exports: [MintNftService],
})
export class MintNftModule {}
