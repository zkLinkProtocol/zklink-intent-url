import { HelperService, SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from './buy-me-a-coffee.service';

@Module({
  imports: [SharedModule],
  providers: [BuyMeACoffeeService, HelperService],
  exports: [BuyMeACoffeeService],
})
export class BuyMeACoffeeModule {}
