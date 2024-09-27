import { Module } from '@nestjs/common';

import { IntentionRepository } from 'src/repositories';
import { IntentionRecordRepository } from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { DataService } from './data.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [DataService, IntentionRepository, IntentionRecordRepository],
  exports: [DataService],
})
export class DataModule {}
