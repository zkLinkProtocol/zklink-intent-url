import { Module } from '@nestjs/common';

import { RedEnvelopeService } from './red-envelope.service';

@Module({
  providers: [RedEnvelopeService],
  exports: [RedEnvelopeService],
})
export class RedEnvelopeModule {}
