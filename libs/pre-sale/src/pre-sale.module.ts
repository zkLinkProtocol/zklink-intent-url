import { Module } from '@nestjs/common';

import { DataModule } from '@core/data';

import { PreSaleService } from './pre-sale.service';
@Module({
  imports: [DataModule],
  providers: [PreSaleService],
  exports: [PreSaleService],
})
export class PreSaleModule {}
