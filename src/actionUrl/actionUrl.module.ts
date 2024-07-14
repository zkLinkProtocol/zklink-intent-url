import { Logger, Module } from '@nestjs/common';
import { ActionUrlService } from './actionUrl.service';
import { ActionUrlController } from './actionUrl.controller';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [ActionUrlController],
  providers: [Logger, ActionUrlService, ActionUrlRepository],
})
export class ActionUrlModule {}
