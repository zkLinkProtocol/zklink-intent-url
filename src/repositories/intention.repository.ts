import { Injectable, Logger } from '@nestjs/common';

import { BaseRepository } from './base.repository';
import { Intention } from '../entities/intention.entity';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRepository extends BaseRepository<Intention> {
  private readonly logger: Logger;
  public constructor(unitOfWork: UnitOfWork) {
    super(Intention, unitOfWork);
    this.logger = new Logger(IntentionRepository.name);
  }

  public async getIntentionByCode(code: string) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      const intention = await transactionManager.findOne(Intention, {
        where: { code },
        relations: { creator: true, action: true, intentionRecords: true },
      });
      return intention;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`query intention failed`);
    }
  }

  public async getIntentionsByCreator(
    creatorId: bigint,
    limit: number,
    offset: number,
  ) {
    try {
      const [intentions, total] = await this.findAndCount({
        where: { creator: { id: creatorId } },
        select: [
          'code',
          'title',
          'metadata',
          'description',
          'createdAt',
          'updatedAt',
        ],
        relations: ['action'],
        take: limit,
        skip: offset,
        order: { createdAt: 'DESC' },
      });
      return [intentions, total] as const;
    } catch (error) {
      this.logger.error(error);
      throw new Error('getIntentionsByCreator error');
    }
  }

  public async queryIntentionWithoutRecordsByCode(code: string) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      const intention = await transactionManager.findOne(Intention, {
        where: { code },
        relations: { creator: true, action: true },
      });
      return intention;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`query intention failed: ${error.message}`);
    }
  }

  public async updateByCode(code: string, params: Intention) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      await transactionManager.update(Intention, { code }, params);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`updateByCode failed: ${error.message}`);
    }
  }

  public async deleteByCode(code: string) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      await transactionManager.softDelete(Intention, { code });
    } catch (error) {
      this.logger.error(error);
      throw new Error(`deleteByCode failed: ${error.message}`);
    }
  }
}
