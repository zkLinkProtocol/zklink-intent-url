import { Logger, Module } from '@nestjs/common';

import { ActionModule } from 'src/action/action.module';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';

@Module({
  imports: [UnitOfWorkModule, ActionModule],
  controllers: [ActionUrlController],
  providers: [Logger, ActionUrlService, ActionUrlRepository],
})
export class ActionUrlModule {}
