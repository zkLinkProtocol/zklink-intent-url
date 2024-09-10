import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { BuyNftModule } from '@action/buy-nft';
import { CrossChainSwapModule } from '@action/cross-chain-swap';
import { NewsModule } from '@action/news';
import { NovaswapModule } from '@action/novaswap';
import { PumpFunModule } from '@action/pump-fun';
import { RedEnvelopeModule } from '@action/red-envelope';
import { SplitBillModule } from '@action/slipt-bill';

import { RegistryService } from './registry.service';

@Module({
  imports: [
    BuyMeACoffeeModule,
    CrossChainSwapModule,
    NovaswapModule,
    RedEnvelopeModule,
    SplitBillModule,
    PumpFunModule,
    NewsModule,
    BuyNftModule,
  ],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
