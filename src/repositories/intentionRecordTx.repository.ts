import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { BaseRepository } from './base.repository';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from '../entities/intentionRecordTx.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRecordTxRepository extends BaseRepository<IntentionRecordTx> {
  private readonly logger: Logger;
  public constructor(unitOfWork: UnitOfWork) {
    super(IntentionRecordTx, unitOfWork);
    this.logger = new Logger(IntentionRecordTxRepository.name);
  }

  public async updateStatusById(
    id: bigint,
    status: IntentionRecordTxStatus,
  ): Promise<void> {
    try {
      await this.unitOfWork
        .getTransactionManager()
        .update(IntentionRecordTx, { id }, { status });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('updateStatusById failed');
    }
  }

  public async updateTxhashById(id: bigint, txHash: string): Promise<void> {
    try {
      await this.unitOfWork
        .getTransactionManager()
        .update(IntentionRecordTx, { id }, { txHash });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('updateTxhashById failed');
    }
  }
}
