import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from '../entities/intentionRecordTx.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRecordTxRepository extends BaseRepository<IntentionRecordTx> {
  public constructor(unitOfWork: UnitOfWork) {
    super(IntentionRecordTx, unitOfWork);
  }

  public async updateStatusById(
    id: bigint,
    status: IntentionRecordTxStatus,
  ): Promise<void> {
    await this.unitOfWork
      .getTransactionManager()
      .update(IntentionRecordTx, { id }, { status });
  }
}
