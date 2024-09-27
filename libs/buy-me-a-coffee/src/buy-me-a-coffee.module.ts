import { Module } from '@nestjs/common';

import { BuyMeACoffeeService } from './buy-me-a-coffee.service';
import { DataModule } from '../../data/src/data.module';

@Module({
  imports: [DataModule],
  providers: [BuyMeACoffeeService],
  exports: [BuyMeACoffeeService, DataModule],
})
export class BuyMeACoffeeModule {}
