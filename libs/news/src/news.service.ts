import { RegistryPlug } from '@action/registry';
import { OKXService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import { TgbotService } from 'src/modules/tgbot/tgbot.service';
import { Address } from 'src/types';

import { FieldTypes, METADATA } from './config';

//magic news
@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FieldTypes> {
  constructor(
    private readonly tgbotService: TgbotService,
    private readonly okxService: OKXService,
  ) {
    super();
  }
  async getMetadata() {
    return METADATA;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId, account } = additionalData;
    if (!account) {
      throw new Error('Missing account!');
    }
    const { amountToBuy, ...restParams } = formData;
    const supportTokens = await this.okxService.getAllTokens(chainId);
    const tokenFrom = supportTokens
      .filter(
        (token) =>
          token.tokenContractAddress.toLowerCase() ===
          formData.tokenFrom.toLowerCase(),
      )
      .map((token) => ({
        address: token.tokenContractAddress.toLowerCase() as Address,
        decimal: Number(token.decimals),
      }))[0];

    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(amountToBuy, tokenFrom.decimal),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;
    const tokenInAddress = tokenFrom.address;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (tokenInAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return [swapTx];
    } else {
      //buy
      approveTx = await this.okxService.getApproveData(
        chainId,
        tokenInAddress,
        ethers.MaxUint256,
      );

      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return [approveTx, swapTx];
    }
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    await this.tgbotService.sendNews(data.additionalData.code!);
    return [];
  }
}
