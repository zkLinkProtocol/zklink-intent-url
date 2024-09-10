import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NewsService } from '@action/news';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeService } from '@action/red-envelope';
import { SplitBillService } from 'libs/split-bill/src';

import { RegistryService } from './registry.service';

@Module({
  providers: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
    SplitBillService,
    NewsService,
  ],
  exports: [
    RegistryService,
    CrossChainSwapService,
    BuyMeACoffeeService,
    NovaswapService,
    RedEnvelopeService,
    SplitBillService,
    NewsService,
  ],
})
export class RegistryModule {}
