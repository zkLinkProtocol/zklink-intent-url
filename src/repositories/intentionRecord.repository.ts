import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';

import { IntentionRecord } from 'src/entities/intentionRecord.entity';
import { IntentionRecordTx } from 'src/entities/intentionRecordTx.entity';

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
        tx.intentionRecordId = savedIntentionRecord.id;
      });

      await manager.save(IntentionRecordTx, intentionRecordTxs);
    });
  }

  // get intention record with txs by id
  public async getIntentionRecordWithTxsById(
    intentionRecordId: bigint,
  ): Promise<IntentionRecord> {
    return await this.findOne({
      where: { id: intentionRecordId },
      relations: ['intentionRecordTxs'],
    });
  }

  // get paging intention record list with txs by intention code and (publicKey or address)
  public async getPagingIntentionRecordListWithTxsByCodeAndPublickey(
    intentionCode: string,
    publicKey: string,
    address: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const queryBuilder = this.unitOfWork
      .getTransactionManager()
      .createQueryBuilder()
      .select([
        'intentionRecord.id',
        'intentionRecord.status',
        'intentionRecord.createdAt',
      ])
      .addSelect("intentionRecord.intention->>'title'", 'title')
      .where('intentionRecord.intentionCode = :intentionCode', {
        intentionCode,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('intentionRecord.publickey = :publicKey', {
            publicKey,
          }).orWhere('intentionRecord.address = :address', { address });
        }),
      )
      .orderBy('intentionRecord.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
  }
}
