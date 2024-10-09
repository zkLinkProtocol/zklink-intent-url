import { Module } from '@nestjs/common';

import {
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { DataService } from './data.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [
    DataService,
    CreatorRepository,
    IntentionRepository,
    IntentionRecordRepository,
  ],
  exports: [DataService],
})
export class DataModule {}
