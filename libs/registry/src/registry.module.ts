import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeService } from '@action/red-envelope';
import { SplitBillModule } from '@action/slipt-bill';

import { RegistryService } from './registry.service';

@Module({
  imports: [SplitBillModule],
  providers: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
  ],
  exports: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
  ],
})
export class RegistryModule {}
