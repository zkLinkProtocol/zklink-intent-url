import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Brackets, In } from 'typeorm';

import {
  IntentionRecord,
  IntentionRecordStatus,
} from 'src/entities/intentionRecord.entity';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';

import { BaseRepository } from './base.repository';
import { UnitOfWork } from '../unitOfWork';

@Injectable()
export class IntentionRecordRepository extends BaseRepository<IntentionRecord> {
  private readonly logger: Logger;
  constructor(unitOfWork: UnitOfWork) {
    super(IntentionRecord, unitOfWork);
    this.logger = new Logger(IntentionRecordRepository.name);
  }

  // insert into intention record and intention record tx in one transaction
  public async insertIntentionRecordAndTx(
    intentionRecord: IntentionRecord,
    intentionRecordTxs: IntentionRecordTx[],
  ) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      await transactionManager.transaction(async (manager) => {
        const savedIntentionRecord = await manager.save(
          IntentionRecord,
          intentionRecord,
        );

        intentionRecordTxs.forEach((tx) => {
          tx.intentionRecord = savedIntentionRecord;
        });

        await manager.save(IntentionRecordTx, intentionRecordTxs);
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`query IntentionRecord error`);
    }
  }

  // update intention record and intention record tx in one transaction
  public async updateIntentionRecordPendingAndTx(
    intentionRecordId: bigint,
    intentionRecordTxs: IntentionRecordTx[],
  ) {
    try {
      const transactionManager = this.unitOfWork.getTransactionManager();
      await transactionManager.transaction(async (manager) => {
        await manager.update(IntentionRecord, intentionRecordId, {
          status: IntentionRecordStatus.PENDING,
        });

        await manager.upsert(IntentionRecordTx, intentionRecordTxs, [
          'chainId',
          'txHash',
        ]);
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`update IntentionRecord error`);
    }
  }

  // get intention record with txs by id
  public async getIntentionRecordWithTxsById(
    intentionRecordId: bigint,
  ): Promise<IntentionRecord | null> {
    try {
      return await this.findOne({
        select: ['id', 'status', 'address', 'createdAt', 'intention'],
        where: { id: intentionRecordId },
        relations: ['intentionRecordTxs', 'intention'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`query intention error`);
    }
  }

  public async getIntentionRecordsByCode(
    code: string,
    address: string | undefined,
  ): Promise<IntentionRecord[] | null> {
    try {
      return await this.find({
        select: ['id', 'status', 'address', 'createdAt', 'intention'],
        where: { intention: { code }, address: address },
        order: { createdAt: 'DESC' },
        relations: ['intentionRecordTxs'],
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `query intention error by ${code}`,
      );
    }
  }

  // get paging intention record list with txs by intention code and address
  public async getPagingIntentionRecordListWithTxsByCodeAndPublickey(
    address: string,
    statuses: [IntentionRecordStatus] | undefined,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const addressHash = address
        ? Buffer.from(address.substring(2), 'hex')
        : '';
      const queryBuilder = this.unitOfWork
        .getTransactionManager()
        .createQueryBuilder(IntentionRecord, 'intentionrecord')
        .leftJoinAndSelect('intentionrecord.intention', 'intention')
        .select([
          'intentionrecord.id as id',
          'intentionrecord.status as status',
          'intentionrecord.createdAt as createdAt',
          'intention.title as title',
          'intention.metadata as metadata',
        ])
        .andWhere(
          new Brackets((qb) => {
            qb.where('intentionrecord.address = :address', {
              address: addressHash,
            });
            if (statuses && statuses.length > 0) {
              qb.andWhere('intentionrecord.status IN (:...statuses)', {
                statuses: statuses,
              });
            }
          }),
        )
        .orderBy('intentionrecord.createdAt', 'DESC')
        .skip((page - 1) * limit)
        .take(limit);

      const data = await queryBuilder.getRawMany();
      const total = await queryBuilder.getCount();

      return { data, total };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `query intention error by address`,
      );
    }
  }

  async getIntentionRecordListTxStatus(
    status: IntentionRecordTxStatus,
  ): Promise<IntentionRecord[]> {
    const manager = this.unitOfWork.getTransactionManager();
    try {
      return await manager.query(
        `select a.id from "intention_record" as a left join "intention_record_tx" as b on a."id" = b."intentionRecordId" where b.status='${status}'`,
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`query intention error by status`);
    }
  }

  async updateStatusByIds(ids: bigint[], status: IntentionRecordStatus) {
    try {
      await this.unitOfWork
        .getTransactionManager()
        .update(IntentionRecord, { id: In(ids) }, { status });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`update intention status error`);
    }
  }

  async countByCodes(codes: string[]) {
    try {
      return await this.unitOfWork
        .getTransactionManager()
        .createQueryBuilder(IntentionRecord, 'intentionrecord')
        .select('intentionrecord.intention', 'code')
        .addSelect('COUNT(*)', 'count')
        .where('intentionrecord.intention IN (:...codes)', { codes })
        .groupBy('intentionrecord.intention')
        .getRawMany();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`countByCodes error`);
    }
  }
}
