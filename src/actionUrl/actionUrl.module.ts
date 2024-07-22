import { Logger, Module } from '@nestjs/common';

import { ActionService } from 'src/action/action.service';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';
import { Aws } from 'src/utils/aws';

import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlService } from './actionUrl.service';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [ActionUrlController],
  providers: [
    Logger,
    ActionUrlService,
    ActionUrlRepository,
    ActionService,
    Aws,
  ],
})
export class ActionUrlModule {}
