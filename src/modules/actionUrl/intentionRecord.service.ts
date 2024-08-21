import { Injectable, Logger } from '@nestjs/common';

import {
  IntentionRecord,
  IntentionRecordStatus,
} from 'src/entities/intentionRecord.entity';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';
import { BusinessException } from 'src/exception/business.exception';
import { IntentionRepository } from 'src/repositories/intention.repository';
import { IntentionRecordRepository } from 'src/repositories/intentionRecord.repository';

import { ActionUrlService } from './actionUrl.service';
import { IntentionRecordAddRequestDto } from './intentionRecord.dto';

@Injectable()
export class IntentionRecordService {
  logger: Logger;
  constructor(
    logger: Logger,
    private readonly intentionRepository: IntentionRepository,
    private readonly intentionRecordRepository: IntentionRecordRepository,
    private readonly intentionService: ActionUrlService,
  ) {
    this.logger = new Logger(IntentionRecordService.name);
  }

  async findOneById(id: bigint): Promise<IntentionRecord> {
    const intentionRecord =
      await this.intentionRecordRepository.getIntentionRecordWithTxsById(id);
    const intentionTmp = await this.intentionService.findOneByCode(
      intentionRecord.intentionCode,
    );
    if (!intentionTmp) {
      throw new BusinessException('Intention not found');
    }
    intentionRecord.intention = {
      ...intentionRecord.intention,
      creator: intentionTmp.creator,
    };
    return intentionRecord;
  }

  async findListByCodeAndPublickey(
    intentionCode: string,
    publicKey: string,
    address: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const { data, total } =
      await this.intentionRecordRepository.getPagingIntentionRecordListWithTxsByCodeAndPublickey(
        intentionCode,
        publicKey,
        address,
        page,
        limit,
      );
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
    };
  }

  async add(
    code: string,
    params: IntentionRecordAddRequestDto,
  ): Promise<boolean> {
    // code is intention code
    const intention = await this.intentionRepository.findOneBy({ code });
    if (!intention) {
      throw new BusinessException('Intention not found');
    }

    const intentionRecord = new IntentionRecord();
    intentionRecord.intentionCode = code;
    intentionRecord.publickey = params.publicKey;
    intentionRecord.address = params.address;
    intentionRecord.bundleHash = params.bundleHash;
    intentionRecord.status = IntentionRecordStatus.PENDING;

    const txs = params.txs.map((tx) => {
      const intentionRecordTx = new IntentionRecordTx();
      intentionRecordTx.txHash = tx.txHash;
      intentionRecordTx.intentionRecordId = BigInt(0);
      intentionRecordTx.chainId = tx.chainId;
      intentionRecordTx.createdAt = new Date(tx.createdAt);
      intentionRecordTx.status = IntentionRecordTxStatus.PENDING;
      return intentionRecordTx;
    });

    try {
      await this.intentionRecordRepository.insertIntentionRecordAndTx(
        intentionRecord,
        txs,
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to add intention record');
    }
  }
}
