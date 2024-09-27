import { DataModule } from '@core/data';
import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from './buy-me-a-coffee.service';

@Module({
  imports: [DataModule],
  providers: [BuyMeACoffeeService],
  exports: [BuyMeACoffeeService],
})
export class BuyMeACoffeeModule {}
