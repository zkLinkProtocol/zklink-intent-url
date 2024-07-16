import { Injectable } from '@nestjs/common';
import { UnitOfWork } from '../unitOfWork';
import { BaseRepository } from './base.repository';
import { Creator } from '../entities/creator.entity';

@Injectable()
export class CreatorRepository extends BaseRepository<Creator> {
  public constructor(unitOfWork: UnitOfWork) {
    super(Creator, unitOfWork);
  }

  async findByPublicKey(publicKey: string): Promise<Creator> {
    return this.findOneBy([{ publickey: publicKey }, { address: publicKey }]);
  }

  async findByPublicId(publicId: string): Promise<Creator> {
    return this.findOneBy([{ publicid: publicId }]);
  }
}
