import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { BuyMeACoffeeService } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeService } from '@action/red-envelope';

import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { BigIntInterceptor } from './interceptor';

@Global()
@Module({
  controllers: [ActionController],
  providers: [
    ActionService,
    {
      provide: APP_INTERCEPTOR,
      useClass: BigIntInterceptor,
    },
    BuyMeACoffeeService,
    RedEnvelopeService,
    NovaswapService,
    CrossChainSwapService,
  ],
  exports: [ActionService],
})
export class ActionModule {}
