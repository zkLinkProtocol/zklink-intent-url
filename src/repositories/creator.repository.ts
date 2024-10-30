import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Creator } from '../entities/creator.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class CreatorRepository extends BaseRepository<Creator> {
  private readonly logger: Logger;
  public constructor(unitOfWork: UnitOfWork) {
    super(Creator, unitOfWork);
    this.logger = new Logger(CreatorRepository.name);
  }

  async findByAddress(address: string): Promise<Creator | null> {
    try {
      return this.findOneBy([{ address }]);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('findByAddress error');
    }
  }

  async findById(id: bigint): Promise<Creator | null> {
    try {
      return this.findOneBy([{ id: id }]);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('findById error');
    }
  }
}
