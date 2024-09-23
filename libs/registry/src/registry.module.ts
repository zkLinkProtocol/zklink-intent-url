import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { BuyNftModule } from '@action/buy-nft';
import { CrossChainSwapModule } from '@action/cross-chain-swap';
import { MintNftModule } from '@action/mint-nft';
import { NewsModule } from '@action/news';
import { NovaswapModule } from '@action/novaswap';
import { PumpFunModule } from '@action/pump-fun';
import { RedEnvelopeModule } from '@action/red-envelope';
import { SharedRedPacketModule } from '@action/shared-red-packet';
import { SplitBillModule } from '@action/slipt-bill';

import { RegistryService } from './registry.service';

@Module({
  imports: [
    RedEnvelopeModule,
    SplitBillModule,
    BuyMeACoffeeModule,
    CrossChainSwapModule,
    NovaswapModule,
    PumpFunModule,
    NewsModule,
    BuyNftModule,
    MintNftModule,
    SharedRedPacketModule,
  ],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
