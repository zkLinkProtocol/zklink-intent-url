import { Injectable, Logger } from '@nestjs/common';

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
  private readonly logger: Logger;
  public constructor(unitOfWork: UnitOfWork) {
    super(Action, unitOfWork);
    this.logger = new Logger(ActionRepository.name);
  }

  async initAction(updateData: Partial<Action>): Promise<void> {
    try {
      return this.upsert(updateData, true, ['id']);
    } catch (error) {
      this.logger.error(error, `initAction failed`);
      throw new Error(`initAction failed`);
    }
  }

  async getActionById(id: string) {
    try {
      const actionMetadata = await this.findOne({
        where: { id },
      });

      return actionMetadata;
    } catch (error) {
      this.logger.error(error, `getAction failed`);
      throw new Error(`getAction failed`);
    }
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
      this.logger.error(error, `getAllActions failed`);
      throw new Error(`getAllActions failed`);
    }
  }
}
