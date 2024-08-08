import { Logger, Module } from '@nestjs/common';

import { UnitOfWorkModule } from 'src/unitOfWork';

import { HubController } from './hub.controller';

@Module({
  imports: [UnitOfWorkModule],
  controllers: [HubController],
  providers: [Logger],
})
export class HubModule {}
