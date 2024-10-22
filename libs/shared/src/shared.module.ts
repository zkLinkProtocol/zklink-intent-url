import { Module } from '@nestjs/common';

import {
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ChainService } from './services/chain.service';
import { DataService } from './services/data.service';
import { HelperService } from './services/helper.service';
import { OKXService } from './services/okx.service';

@Module({
  imports: [UnitOfWorkModule],
  providers: [
    ChainService,
    DataService,
    OKXService,
    HelperService,
    CreatorRepository,
    IntentionRepository,
    IntentionRecordRepository,
  ],
  exports: [DataService, OKXService, HelperService, ChainService],
})
export class SharedModule {}
