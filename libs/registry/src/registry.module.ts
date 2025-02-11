import { Module } from '@nestjs/common';

import { AgxModule } from '@action/agx';
import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { BuyNftMagicEdenModule } from '@action/buy-nft-magic-eden';
import { BuyNftOKXModule } from '@action/buy-nft-okx';
import { CrossChainSwapModule } from '@action/cross-chain-swap';
import { DxFunModule } from '@action/dx-fun';
import { MagicSwapModule } from '@action/magic-swap';
import { MintIntractModule } from '@action/mint-intract';
import { MintIntractV2Module } from '@action/mint-intract-v2';
import { MintNftModule } from '@action/mint-nft';
import { MintNovaNftModule } from '@action/mint-nova-nft';
import { NewsModule } from '@action/news';
import { NovaswapModule } from '@action/novaswap';
import { OkxBridgeModule } from '@action/okx-bridge';
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
    DxFunModule,
    NewsModule,
    OkxBridgeModule,
    BuyNftMagicEdenModule,
    BuyNftOKXModule,
    MintNftModule,
    MintNovaNftModule,
    SharedRedPacketModule,
    PreSaleModule,
    MagicSwapModule,
    AgxModule,
    MintIntractModule,
    MintIntractV2Module,
  ],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
