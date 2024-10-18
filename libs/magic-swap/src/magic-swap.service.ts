import { RegistryPlug } from '@action/registry';
import { OKXService } from '@core/shared';
import { HelperService } from '@core/shared';
import { getERC20SymbolAndDecimals } from '@core/utils';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { FieldTypes, METADATA } from './config';
import { RPC_URL } from './config';
@RegistryPlug('magic-swap', 'v1')
@Injectable()
export class MagicSwapService extends ActionDto<FieldTypes> {
  constructor(
    private readonly okxService: OKXService,
    private readonly helperService: HelperService,
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
    const { code, chainId, account, commissionRate = 0.001 } = additionalData;

    if (!code) {
      throw Error('Missing code');
    }

    if (!commissionRate) {
      throw Error('Missing commissionRate');
    }

    const commissionTx = await this.helperService.parseCommissionTx({
      code,
      chainId,
      amount: Number(formData.amountToBuy),
      token:
        formData.tokenFrom === ethers.ZeroAddress ? '' : formData.tokenFrom,
      commissionRate,
    });

    const provider = new ethers.JsonRpcProvider(
      RPC_URL[chainId as unknown as keyof typeof RPC_URL],
    );

    if (!account) {
      throw new Error('Missing account!');
    }
    const { amountToBuy, ...restParams } = formData;
    let tokenInAddress = formData.tokenFrom;
    let decimals;

    if (formData.tokenFrom === ethers.ZeroAddress) {
      tokenInAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      decimals = 18;
    } else {
      decimals = (await getERC20SymbolAndDecimals(provider, tokenInAddress))
        .decimals;
    }

    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(
        String(Number(amountToBuy) - commissionRate * Number(amountToBuy)),
        decimals,
      ),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress as `0x${string}`,
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
      return [commissionTx, swapTx];
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
      return [commissionTx, approveTx, swapTx];
    }
  }
}
