import { Injectable } from '@nestjs/common';
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
  public constructor(unitOfWork: UnitOfWork) {
    super(IntentionRecord, unitOfWork);
  }

  // insert into intention record and intention record tx in one transaction
  public async insertIntentionRecordAndTx(
    intentionRecord: IntentionRecord,
    intentionRecordTxs: IntentionRecordTx[],
  ) {
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
  }

  // update intention record and intention record tx in one transaction
  public async updateIntentionRecordPendingAndTx(
    intentionRecordId: bigint,
    intentionRecordTxs: IntentionRecordTx[],
  ) {
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
  }

  // get intention record with txs by id
  public async getIntentionRecordWithTxsById(
    intentionRecordId: bigint,
  ): Promise<IntentionRecord | null> {
    return await this.findOne({
      select: ['id', 'status', 'address', 'createdAt', 'intention'],
      where: { id: intentionRecordId },
      relations: ['intentionRecordTxs', 'intention'],
    });
  }

  public async getIntentionRecordsByCode(
    code: string,
    address: string | undefined,
  ): Promise<IntentionRecord[] | null> {
    return await this.find({
      select: ['id', 'status', 'address', 'createdAt', 'intention'],
      where: { intention: { code }, address: address },
      order: { createdAt: 'DESC' },
      relations: ['intentionRecordTxs'],
    });
  }

  // get paging intention record list with txs by intention code and address
  public async getPagingIntentionRecordListWithTxsByCodeAndPublickey(
    address: string,
    status: string | undefined,
    page: number = 1,
    limit: number = 10,
  ) {
    const addressHash = address ? Buffer.from(address.substring(2), 'hex') : '';
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
        }),
      )
      .orderBy('intentionrecord.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (status) {
      queryBuilder.andWhere('intentionrecord.status = :status', {
        status,
      });
    }

    const data = await queryBuilder.getRawMany();
    const total = await queryBuilder.getCount();

    return { data, total };
  }

  async getIntentionRecordListTxStatus(
    status: IntentionRecordTxStatus,
  ): Promise<IntentionRecord[]> {
    const manager = this.unitOfWork.getTransactionManager();
    return await manager.query(
      `select a.id from "intention_record" as a left join "intention_record_tx" as b on a."id" = b."intentionRecordId" where b.status='${status}'`,
    );
  }

  async updateStatusByIds(ids: bigint[], status: IntentionRecordStatus) {
    await this.unitOfWork
      .getTransactionManager()
      .update(IntentionRecord, { id: In(ids) }, { status });
  }

  async countByCodes(codes: string[]) {
    return await this.unitOfWork
      .getTransactionManager()
      .createQueryBuilder(IntentionRecord, 'intentionrecord')
      .select('intentionrecord.intention', 'code')
      .addSelect('COUNT(*)', 'count')
      .where('intentionrecord.intention IN (:...codes)', { codes })
      .groupBy('intentionrecord.intention')
      .getRawMany();
  }
}
