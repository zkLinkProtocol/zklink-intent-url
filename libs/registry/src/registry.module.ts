import { Module } from '@nestjs/common';

import { BuyMeACoffeeModule } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeModule } from '@action/red-envelope';
import { SplitBillModule } from '@action/slipt-bill';

import { RegistryService } from './registry.service';

@Module({
  imports: [BuyMeACoffeeModule, SplitBillModule, RedEnvelopeModule],
  providers: [RegistryService, CrossChainSwapService, NovaswapService],
  exports: [RegistryService, CrossChainSwapService, NovaswapService],
})
export class RegistryModule {}
