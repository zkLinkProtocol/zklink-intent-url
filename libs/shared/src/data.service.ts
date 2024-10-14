import { Injectable } from '@nestjs/common';

import {
  CreatorRepository,
  IntentionRecordRepository,
  IntentionRepository,
} from 'src/repositories';

@Injectable()
export class DataService {
  constructor(
    private readonly intentionRepository: IntentionRepository,
    private readonly intentionRecordRepository: IntentionRecordRepository,
    private readonly creatorRepository: CreatorRepository,
  ) {}
  public async getMagicLinkCreatorInfoByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    return intention?.creator;
  }

  public async getMagicLinkInfoByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    return intention?.settings.intentInfo;
  }

  public async findRecordByCode(intentionCode: string, address?: string) {
    return await this.intentionRecordRepository.getIntentionRecordsByCode(
      intentionCode,
      address,
    );
  }

  public async getUserInfo(address: string) {
    return await this.creatorRepository.findByAddress(address);
  }
}
