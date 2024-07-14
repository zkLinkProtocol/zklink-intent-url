import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../unitOfWork';
import { BaseRepository } from './base.repository';
import { ActionUrl } from '../entities/actionUrl.entity';

@Injectable()
export class ActionUrlRepository extends BaseRepository<ActionUrl> {
  public constructor(unitOfWork: UnitOfWork) {
    super(ActionUrl, unitOfWork);
  }

  public async updateByCode(code: string, params: any) {
    const transactionManager = this.unitOfWork.getTransactionManager();
    await transactionManager.update(ActionUrl, { code }, params);
  }

  public async deleteByCode(code: string) {
    const transactionManager = this.unitOfWork.getTransactionManager();
    await transactionManager.softDelete(ActionUrl, { code });
  }
}
