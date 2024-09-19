import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { RPC_URL } from 'src/common/chain/config';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import { getApproveData, getSwapData } from 'src/common/okxAPI';
import { TgbotService } from 'src/modules/tgbot/tgbot.service';

import { FormName, METADATA, TOKEN_CONFIG } from './config';

//magic news
@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FormName> {
  constructor(private readonly tgbotService: TgbotService) {
    super();
  }
  async getMetadata() {
    return METADATA;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId, account } = additionalData;
    if (!account) {
      throw new Error('Missing account!');
    }
    const { amountToBuy, ...restParams } = formData;
    const params = { ...restParams, amountToBuy: BigInt(amountToBuy) };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;
    const tokenInAddress =
      TOKEN_CONFIG[additionalData.chainId][params.tokenFrom];
    const provider = new ethers.JsonRpcProvider(RPC_URL[chainId]) as any;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (params.tokenFrom === 'weth') {
      console.log(params);
      console.log(account);
      swapTx = await getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return [swapTx];
    } else {
      //buy
      approveTx = await getApproveData(
        chainId,
        tokenInAddress,
        ethers.MaxUint256,
      );

      swapTx = await getSwapData(
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
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    await this.tgbotService.sendNews(data.additionalData.code!);
    return [];
  }
}
