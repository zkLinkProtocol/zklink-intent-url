import { Injectable } from '@nestjs/common';

import {
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';

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

  public async getMagicLinkInfoByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    return intention?.settings.intentInfo;
  }

  async findListByCode(intentionCode: string, address?: string) {
    return await this.intentionRecordRepository.getIntentionRecordWithTxsByCode(
      intentionCode,
      address,
    );
  }
}
