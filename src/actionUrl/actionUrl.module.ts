import { Logger, Module } from '@nestjs/common';
import { ActionUrlService } from './actionUrl.service';
import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';
import { ActionService } from 'src/action/action.service';
import { Aws } from 'src/utils/aws';

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
