import { Logger, Module } from '@nestjs/common';

import { ActionModule } from 'src/modules/action/action.module';
import { IntentionRepository } from 'src/repositories/intention.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';

@Module({
  imports: [UnitOfWorkModule, ActionModule],
  controllers: [ActionUrlController],
  providers: [Logger, ActionUrlService, IntentionRepository],
})
export class ActionUrlModule {}
