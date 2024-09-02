import { Injectable } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Creator } from '../entities/creator.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class CreatorRepository extends BaseRepository<Creator> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Creator, unitOfWork);
  }

  async findByPublicKey(publicKey: string): Promise<Creator | null> {
    return this.findOneBy([{ publickey: publicKey }, { address: publicKey }]);
  }

  async findByPublicId(publicId: string): Promise<Creator | null> {
    return this.findOneBy([{ publicId: publicId }]);
  }

  async findByAddress(address: string): Promise<Creator | null> {
    return this.findOneBy([{ address }]);
  }
}
