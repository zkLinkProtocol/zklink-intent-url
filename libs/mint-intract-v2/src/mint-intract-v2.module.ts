import { Module } from '@nestjs/common';

import { SharedModule } from '@core/shared';

import { MintIntractV2Service } from './mint-intract-v2.service';

@Module({
  imports: [SharedModule],
  providers: [MintIntractV2Service],
  exports: [MintIntractV2Service],
})
export class MintIntractV2Module {}
