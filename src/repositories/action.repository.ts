import { Injectable } from '@nestjs/common';

import { Action } from 'src/entities/action.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

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
      const allActionMetadataRaw = await this.find({
        select: ['id', 'logo', 'title', 'networks', 'description', 'author'],
        order: {
          sortOrder: 'asc',
        },
        relations: ['intentions', 'commissions', 'intentionRecords'],
      });
      return allActionMetadataRaw;
    } catch (error) {
      throw new Error(`getAllActions failed: ${error.message}`);
    }
  }
}
