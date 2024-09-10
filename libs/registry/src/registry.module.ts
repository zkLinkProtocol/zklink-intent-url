import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { CrossChainSwapModule } from '@action/cross-chain-swap';
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
  ],
  providers: [RegistryService],
  exports: [RegistryService],
})
export class RegistryModule {}
