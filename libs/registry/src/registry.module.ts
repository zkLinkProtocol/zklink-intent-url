import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { BuyNftMagicEdenModule } from '@action/buy-nft-magic-eden';
import { BuyNftOKXModule } from '@action/buy-nft-okx';
import { CrossChainSwapModule } from '@action/cross-chain-swap';
import { MagicSwapModule } from '@action/magic-swap';
import { MintNftModule } from '@action/mint-nft';
import { MintNovaNftModule } from '@action/mint-nova-nft';
import { NewsModule } from '@action/news';
import { NovaswapModule } from '@action/novaswap';
import { PreSaleModule } from '@action/pre-sale';
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
    BuyNftMagicEdenModule,
    BuyNftOKXModule,
    MintNftModule,
    MintNovaNftModule,
    SharedRedPacketModule,
    PreSaleModule,
    MagicSwapModule,
  ],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
