import { DataModule } from '@core/data';
import { Module } from '@nestjs/common';

import { RedEnvelopeService } from './red-envelope.service';

@Module({
  imports: [DataModule],
  providers: [RedEnvelopeService],
  exports: [RedEnvelopeService],
})
export class RedEnvelopeModule {}
