import { Module } from '@nestjs/common';

import { RedEnvelopeService } from './red-envelope.service';
import { DataModule } from '../../data/src/data.module';

@Module({
  imports: [DataModule],
  providers: [RedEnvelopeService],
  exports: [RedEnvelopeService],
})
export class RedEnvelopeModule {}
