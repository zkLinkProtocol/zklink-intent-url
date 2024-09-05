import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Creator } from '../entities/creator.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class CreatorRepository extends BaseRepository<Creator> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Creator, unitOfWork);
  }

  async findByAddress(address: string): Promise<Creator | null> {
    return this.findOneBy([{ address }]);
  }
}
