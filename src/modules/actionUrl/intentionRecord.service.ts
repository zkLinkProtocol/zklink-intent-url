import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { IsNull, Not } from 'typeorm';

import configFactory from 'src/config';
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
import { IntentionRecordAddRequestDto } from './intentionRecord.dto';

@Injectable()
export class IntentionRecordService {
  logger: Logger;
  constructor(
    private readonly intentionRepository: IntentionRepository,
    public readonly intentionRecordRepository: IntentionRecordRepository,
    private readonly intentionRecordTxRepository: IntentionRecordTxRepository,
    private readonly intentionService: ActionUrlService,
  ) {
    this.logger = new Logger(IntentionRecordService.name);
  }

  async findOneById(id: bigint): Promise<IntentionRecord> {
    const intentionRecord =
      await this.intentionRecordRepository.getIntentionRecordWithTxsById(id);
    if (!intentionRecord) {
      throw new BusinessException('Intention record not found');
    }
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
    intentionRecord.address = params.address;
    intentionRecord.status = IntentionRecordStatus.PENDING;
    intentionRecord.intention = intention;

    const txs = params.txs.map((tx) => {
      const intentionRecordTx = new IntentionRecordTx();
      if (tx.txHash) {
        intentionRecordTx.txHash = tx.txHash;
      }
      if (tx.opUserHash) {
        intentionRecordTx.opUserHash = tx.opUserHash;
      }
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

  async handleRecordTxsStatus() {
    const loop = true;
    while (loop) {
      this.logger.log(`start handle tx status`);
      try {
        this.handleOpUserTxStatus();
        this.handleTxStatus();
        this.handleRecordStatus();
      } catch (error) {
        this.logger.error(error);
      }
      this.logger.log(`end handle tx status`);
      await this.delay(2000);
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
      const txHashs = await this.fetchTxReceipt(tx.chainId, tx.opUserHash);
      if (txHashs.length === 0) {
        continue;
      }
      const txHash = txHashs[0] ?? '';
      if (!txHash) {
        continue;
      }
      await this.intentionRecordTxRepository.updateTxhasById(tx.id, txHash);
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

    //set faild
    const faildRecords =
      await this.intentionRecordRepository.getIntentionRecordListTxStatus(
        IntentionRecordTxStatus.FAILD,
      );
    if (faildRecords.length > 0) {
      const faildRecordIds = faildRecords.map((item) => item.id);
      await this.intentionRecordRepository.updateStatusByIds(
        faildRecordIds,
        IntentionRecordStatus.FAILD,
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
    const rpcs: { [key: number]: string } = (await configFactory())?.rpc ?? {};
    const rpc = rpcs[chainId];
    if (!rpc) {
      this.logger.log(`Had no supported the chinId: ${chainId}`);
      return IntentionRecordTxStatus.FAILD;
    }
    const provider = new ethers.JsonRpcProvider(rpc);
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      return IntentionRecordTxStatus.PENDING;
    }
    if (tx.blockNumber) {
      return IntentionRecordTxStatus.SUCCESS;
    }
    return IntentionRecordTxStatus.FAILD;
  }

  private async fetchTxReceipt(
    networkId: number,
    userOphash: string,
  ): Promise<string[]> {
    const url = `https://dev-proxy-bundler.sepolia.zklink.io/deposit/findBundlerTxReceipt`;
    const response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        networkId,
        userOphash,
      }),
    });
    const responseJson = await response.json();
    // if faild
    if (responseJson.status !== 1) {
      return [];
    }
    const logs = responseJson?.result?.logs ?? [];
    if (logs.length === 0) {
      return [];
    }
    const txHashs = logs.map((item: any) => {
      return item.transactionHash;
    });
    return txHashs;
  }
}
