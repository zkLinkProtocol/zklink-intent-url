import { Injectable } from '@nestjs/common';

import { IntentionRepository } from 'src/repositories';

@Injectable()
export class DataService {
  constructor(private readonly intentionRepository: IntentionRepository) {}
  public async getMagicLinkCreatorInfoByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    return intention?.creator;
  }
}
