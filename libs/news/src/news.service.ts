import { NovaswapService } from '@action/novaswap';
import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { TgbotService } from './../../../src/modules/tgbot/tgbot.service';
import { FormName, METADATA } from './config';

@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FormName> {
  constructor(
    private readonly novaswapService: NovaswapService,
    private readonly tgbotService: TgbotService,
  ) {
    super();
  }
  async getMetadata() {
    return METADATA;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    return await this.novaswapService.generateTransaction(data);
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    await this.tgbotService.sendNews(data.additionalData.code!);
    return [];
  }
}
