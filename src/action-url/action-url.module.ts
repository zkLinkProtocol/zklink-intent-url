import { Module } from '@nestjs/common';
import { ActionUrlService } from './action-url.service';
import { ActionUrlController } from './action-url.controller';

@Module({
  controllers: [ActionUrlController],
  providers: [ActionUrlService],
})
export class ActionUrlModule {}
