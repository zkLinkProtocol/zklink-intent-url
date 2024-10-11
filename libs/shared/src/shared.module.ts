import { Module } from '@nestjs/common';

import {
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { DataService } from './data.service';
import { OKXService } from './okx.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [
    DataService,
    OKXService,
    CreatorRepository,
    IntentionRepository,
    IntentionRecordRepository,
  ],
  exports: [DataService, OKXService],
})
export class SharedModule {}
