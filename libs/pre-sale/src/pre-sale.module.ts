import { Module } from '@nestjs/common';

import { SharedModule } from '@core/shared';

import { PreSaleService } from './pre-sale.service';
@Module({
  imports: [SharedModule],
  providers: [PreSaleService],
  exports: [PreSaleService],
})
export class PreSaleModule {}
