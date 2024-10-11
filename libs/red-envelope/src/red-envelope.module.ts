import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';

import { RedEnvelopeService } from './red-envelope.service';

@Module({
  imports: [SharedModule],
  providers: [RedEnvelopeService],
  exports: [RedEnvelopeService],
})
export class RedEnvelopeModule {}
