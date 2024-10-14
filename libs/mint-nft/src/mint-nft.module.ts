import { Module } from '@nestjs/common';

import { MintNftService } from './mint-nft.service';

@Module({
  imports: [],
  providers: [MintNftService],
  exports: [MintNftService],
})
export class MintNftModule {}
