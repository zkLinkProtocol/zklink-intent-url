import { Injectable } from '@nestjs/common';

import { Action } from 'src/entities/action.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

type ActionsData = Action & {
  intentionsCount: number;
  commissionsCount: number;
  intentionRecordsCount: number;
};

@Injectable()
export class ActionRepository extends BaseRepository<Action> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Action, unitOfWork);
  }

  async initAction(updateData: Partial<Action>): Promise<void> {
    return this.upsert(updateData, true, ['id']);
  }

  async getAllActions() {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      const allActionMetadataRaw = await transactionManager
        .createQueryBuilder(Action, 'action')
        .select([
          'action.id',
          'action.logo',
          'action.title',
          'action.networks',
          'action.description',
          'action.author',
        ])
        .loadRelationCountAndMap('action.intentionsCount', 'action.intentions')
        .loadRelationCountAndMap(
          'action.commissionsCount',
          'action.commissions',
        )
        .loadRelationCountAndMap(
          'action.intentionRecordsCount',
          'action.intentionRecords',
        )
        .orderBy('action.sortOrder', 'ASC')
        .getMany();

      return allActionMetadataRaw as ActionsData[];
    } catch (error) {
      throw new Error(`getAllActions failed: ${error.message}`);
    }
  }
}
