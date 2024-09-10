import { CrossChainSwapService } from '@action/cross-chain-swap';
import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { FormName, METADATA } from './config';

@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FormName> {
  constructor(private readonly crossChainSwapService: CrossChainSwapService) {
    super();
  }
  async getMetadata() {
    return METADATA;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    return await this.crossChainSwapService.generateTransaction(data);
  }
}
