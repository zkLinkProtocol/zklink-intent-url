import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNull, Not } from 'typeorm';

import { ChainService } from '@core/shared';
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
import { IntentionRecordTxRepository } from 'src/repositories/intentionRecordTx.repository';

import { ActionUrlService } from './actionUrl.service';
import { IntentionRecordAddRequestDto } from './dto';
import { ActionService } from '../action/action.service';

@Injectable()
export class IntentionRecordService {
  logger: Logger;
  constructor(
    private readonly actionService: ActionService,
    private readonly configService: ConfigService,
    private readonly intentionRepository: IntentionRepository,
    public readonly intentionRecordRepository: IntentionRecordRepository,
    private readonly intentionRecordTxRepository: IntentionRecordTxRepository,
    private readonly intentionService: ActionUrlService,
    private readonly chainService: ChainService,
  ) {
    this.logger = new Logger(IntentionRecordService.name);
  }

  async findOneById(id: bigint) {
    const intentionRecord =
      await this.intentionRecordRepository.getIntentionRecordWithTxsById(id);
    if (!intentionRecord) {
      throw new BusinessException(`Intention record ${id} not found`);
    }
    const intentionTmp = await this.intentionService.findOneByCode(
      intentionRecord.intention.code,
    );
    if (!intentionTmp) {
      throw new BusinessException(
        `Intention ${intentionRecord.intention.code} not found`,
      );
    }
    const actionStore = this.actionService.getActionVersionStore(
      intentionTmp.action.id,
      intentionTmp.actionVersion,
    );
    const settingValue =
      intentionRecord.intention.settings.intentInfo.components.reduce(
        (res, cur) => {
          res[cur.name] = cur.value;
          return res;
        },
        {} as { [key: string]: any },
      );

    const sharedContent = await actionStore.generateSharedContent({
      additionalData: {
        chainId: intentionRecord.intention.settings.intentInfo.network.chainId,
      },
      formData: settingValue,
    });
    const intention = {
      ...intentionRecord.intention,
      creator: intentionTmp.creator,
      sharedContent,
    };

    return { ...intentionRecord, intention };
  }

  async findListAndPublickey(
    address: string,
    status: string | undefined,
    page: number = 1,
    limit: number = 10,
  ) {
    const { data, total } =
      await this.intentionRecordRepository.getPagingIntentionRecordListWithTxsByCodeAndPublickey(
        address,
        status,
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

  async countByCode(code: string): Promise<number> {
    const res = await this.intentionRecordRepository.getIntentionRecordsByCode(
      code,
      undefined,
    );
    return res ? res.length : 0;
  }

  async countByCodes(codes: string[]): Promise<{ [key: string]: number }> {
    if (codes.length === 0) {
      return {};
    }
    const res = await this.intentionRecordRepository.countByCodes(codes);
    const countByCode: { [key: string]: number } = {};
    res.forEach((record) => {
      countByCode[record.code] = parseInt(record.count, 10);
    });
    codes.forEach((code) => {
      if (!(code in countByCode)) {
        countByCode[code] = 0;
      }
    });

    return countByCode;
  }

  async add(
    code: string,
    params: IntentionRecordAddRequestDto,
  ): Promise<boolean> {
    // code is intention code
    const intention = await this.intentionRepository.findOne({
      where: { code },
      relations: { action: true },
    });
    if (!intention) {
      throw new BusinessException('Intention not found');
    }

    const intentionRecord = new IntentionRecord();
    intentionRecord.action = intention.action;
    intentionRecord.intention = intention;
    intentionRecord.address = params.address;
    intentionRecord.status = IntentionRecordStatus.PENDING;

    const txs = params.txs.map((tx) => {
      const intentionRecordTx = new IntentionRecordTx();
      if (tx.txHash) {
        intentionRecordTx.txHash = tx.txHash;
      }
      if (tx.opUserHash) {
        intentionRecordTx.opUserHash = tx.opUserHash;
      }
      intentionRecordTx.intentionRecord = intentionRecord;
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

  async handleRecordTxsStatus() {
    const loop = true;
    while (loop) {
      try {
        await this.handleOpUserTxStatus();
        await this.handleTxStatus();
        await this.handleRecordStatus();
      } catch (error) {
        this.logger.error(error);
      }
      await this.delay(10000);
    }
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async handleOpUserTxStatus() {
    const txs = await this.intentionRecordTxRepository.find({
      select: ['id', 'chainId', 'opUserHash'],
      where: {
        status: IntentionRecordTxStatus.PENDING,
        txHash: IsNull(), // txHash = null
        opUserHash: Not(IsNull()), // opUserHash ！= null
      },
      order: { id: 'ASC' },
    });
    if (txs.length === 0) {
      return;
    }
    for (const tx of txs) {
      const txHashes = await this.fetchTxReceipt(tx.chainId, tx.opUserHash);
      if (txHashes.length === 0) {
        continue;
      }
      const txHash = txHashes[0] ?? '';
      if (!txHash) {
        continue;
      }
      await this.intentionRecordTxRepository.updateTxhashById(tx.id, txHash);
    }
  }

  private async handleRecordStatus() {
    // set success
    const successRecords =
      await this.intentionRecordRepository.getIntentionRecordListTxStatus(
        IntentionRecordTxStatus.SUCCESS,
      );
    if (successRecords.length > 0) {
      const successRecordIds = successRecords.map((item) => item.id);
      await this.intentionRecordRepository.updateStatusByIds(
        successRecordIds,
        IntentionRecordStatus.SUCCESS,
      );
    }

    //set failed
    const failedRecords =
      await this.intentionRecordRepository.getIntentionRecordListTxStatus(
        IntentionRecordTxStatus.FAILED,
      );
    if (failedRecords.length > 0) {
      const failedRecordIds = failedRecords.map((item) => item.id);
      await this.intentionRecordRepository.updateStatusByIds(
        failedRecordIds,
        IntentionRecordStatus.FAILED,
      );
    }
  }

  private async handleTxStatus() {
    const txs = await this.intentionRecordTxRepository.find({
      select: ['id', 'txHash', 'chainId'],
      where: { status: IntentionRecordTxStatus.PENDING, txHash: Not(IsNull()) }, // txHash ！= null
      order: { id: 'ASC' },
    });
    for (const tx of txs) {
      const status = await this.checkTxStatus(tx.txHash, tx.chainId);
      if (status === IntentionRecordTxStatus.PENDING) {
        continue;
      }
      await this.intentionRecordTxRepository.updateStatusById(tx.id, status);
    }
  }

  // use ethers.js to check tx status
  private async checkTxStatus(txHash: string, chainId: number) {
    const provider = this.chainService.getProvider(chainId);
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      return IntentionRecordTxStatus.PENDING;
    }
    if (tx.blockNumber) {
      return IntentionRecordTxStatus.SUCCESS;
    }
    return IntentionRecordTxStatus.FAILED;
  }

  private async fetchTxReceipt(
    networkId: number,
    userOphash: string,
  ): Promise<string[]> {
    const turnkeyApi = this.configService.get('turnkeyApi', { infer: true });
    const url = `${turnkeyApi}/deposit/findBundlerTxReceipt`;
    const response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        networkId,
        userOphash,
      }),
    });
    const responseJson = await response.json();
    // if failed
    if (responseJson.status !== 1) {
      return [];
    }
    const logs = responseJson?.result?.logs ?? [];
    if (logs.length === 0) {
      return [];
    }
    const txHashes = logs.map((item: any) => {
      return item.transactionHash;
    });
    return txHashes;
  }
}
