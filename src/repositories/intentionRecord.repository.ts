import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';

import {
  IntentionRecord,
  IntentionRecordStatus,
} from 'src/entities/intentionRecord.entity';
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
      const exists = await manager.findOneBy(IntentionRecord, {
        opUserHash: intentionRecord.opUserHash,
        opUserChainId: intentionRecord.opUserChainId,
      });
      if (exists) {
        return;
      }
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
      select: [
        'id',
        'intentionCode',
        'status',
        'publickey',
        'address',
        'createdAt',
        'intention',
      ],
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
    const publickeyHash = publicKey
      ? Buffer.from(publicKey.substring(2), 'hex')
      : '';
    const addressHash = address ? Buffer.from(address.substring(2), 'hex') : '';
    const queryBuilder = this.unitOfWork
      .getTransactionManager()
      .createQueryBuilder(IntentionRecord, 'intentionrecord')
      .select([
        'intentionrecord.id as id',
        'intentionrecord.status as status',
        'intentionrecord.createdAt as createdAt',
      ])
      .addSelect("intentionrecord.intention->>'title'", 'title')
      .where('intentionrecord.intentionCode = :intentionCode', {
        intentionCode,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('intentionrecord.publickey = :publicKey', {
            publicKey: publickeyHash,
          }).orWhere('intentionrecord.address = :address', {
            address: addressHash,
          });
        }),
      )
      .orderBy('intentionrecord.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const data = await queryBuilder.getRawMany();
    const total = await queryBuilder.getCount();

    return { data, total };
  }
}
