import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { RedEnvelopeService } from './red-envelope.service';

@Module({
  imports: [ActionUrlModule],
  providers: [RedEnvelopeService],
  exports: [RedEnvelopeService, ActionUrlModule],
})
export class RedEnvelopeModule {}
