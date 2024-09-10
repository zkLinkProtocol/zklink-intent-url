import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { PumpFunModule } from '@action/pump-fun';
import { RedEnvelopeService } from '@action/red-envelope';
import { SplitBillModule } from '@action/slipt-bill';

import { RegistryService } from './registry.service';

@Module({
  imports: [BuyMeACoffeeModule, SplitBillModule, PumpFunModule],
  providers: [
    RegistryService,
    CrossChainSwapService,
    NovaswapService,
    RedEnvelopeService,
  ],
  exports: [
    RegistryService,
    CrossChainSwapService,
    NovaswapService,
    RedEnvelopeService,
  ],
})
export class RegistryModule {}
