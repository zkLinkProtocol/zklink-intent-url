import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { BuyMeACoffeeService } from './buy-me-a-coffee.service';

@Module({
  imports: [ActionUrlModule],
  providers: [BuyMeACoffeeService],
  exports: [BuyMeACoffeeService, ActionUrlModule],
})
export class BuyMeACoffeeModule {}
