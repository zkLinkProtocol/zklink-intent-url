import { Injectable } from '@nestjs/common';

import { Commission } from 'src/entities/commission.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class CommissionRepository extends BaseRepository<Commission> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Commission, unitOfWork);
  }

  async save(commission: Commission) {
    try {
      await this.add(commission);
    } catch (error) {
      throw new Error(`getAllActions failed: ${error.message}`);
    }
  }
}
