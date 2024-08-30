import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeService } from '@action/red-envelope';
import { SliptOrderService } from 'libs/split-order/src';

import { RegistryService } from './registry.service';

@Module({
  providers: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
    SliptOrderService,
  ],
  exports: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
    SliptOrderService,
  ],
})
export class RegistryModule {}
