import { Injectable } from '@nestjs/common';

import { IntentionRepository } from 'src/repositories';
import { IntentionRecordRepository } from 'src/repositories/intentionRecord.repository';

@Injectable()
export class DataService {
  constructor(
    private readonly intentionRepository: IntentionRepository,
    private readonly intentionRecordRepository: IntentionRecordRepository,
  ) {}
  public async getMagicLinkCreatorInfoByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    return intention?.creator;
  }

  async findListByCode(intentionCode: string, address?: string) {
    return await this.intentionRecordRepository.getIntentionRecordWithTxsByCode(
      intentionCode,
      address,
    );
  }
}
