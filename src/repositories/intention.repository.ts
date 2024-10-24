import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Intention } from '../entities/intention.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRepository extends BaseRepository<Intention> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Intention, unitOfWork);
  }

  public async queryIntentionByCode(code: string) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      const intention = await transactionManager.findOne(Intention, {
        where: { code },
        relations: { creator: true, action: true, intentionRecords: true },
      });
      return intention;
    } catch (error) {
      throw new Error(`query intention failed: ${error.message}`);
    }
  }

  public async queryIntentionWithoutRecordsByCode(code: string) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      const intention = await transactionManager.findOne(Intention, {
        where: { code },
        relations: { creator: true, action: true },
      });
      return intention;
    } catch (error) {
      throw new Error(`query intention failed: ${error.message}`);
    }
  }

  public async updateByCode(code: string, params: any) {
    const transactionManager = this.unitOfWork.getTransactionManager();
    await transactionManager.update(Intention, { code }, params);
  }

  public async deleteByCode(code: string) {
    const transactionManager = this.unitOfWork.getTransactionManager();
    await transactionManager.softDelete(Intention, { code });
  }
}
