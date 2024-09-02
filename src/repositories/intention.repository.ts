import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Intention } from '../entities/intention.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRepository extends BaseRepository<Intention> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Intention, unitOfWork);
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
