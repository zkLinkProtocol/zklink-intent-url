import { RegistryPlug } from '@action/registry';
import { OKXService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { RPC_URL } from 'src/common/chain/config';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { ESTIMATED_GAS_WALLET, METADATA, TOKEN_CONFIG } from './config';
import { FieldTypes } from './types';
import { getEstimatedGasCost, getGasCost, getSolverFee } from './utils';

@RegistryPlug('cross-chain-swap', 'v1')
@Injectable()
export class CrossChainSwapService extends ActionDto<FieldTypes> {
  constructor(private readonly okxService: OKXService) {
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
    const tokenFrom = TOKEN_CONFIG[additionalData.chainId][formData.tokenFrom];
    const tokenInAddress = tokenFrom.address;
    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(amountToBuy, tokenFrom.decimal),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;

    const provider = new ethers.JsonRpcProvider(RPC_URL[chainId]) as any;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenFrom.address,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (params.tokenFrom === 'weth') {
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenTo,
        params.amountToBuy,
      );
      const gasCost = await getGasCost(
        BigInt(
          (swapTx as TransactionInfo & { estimateGasFee: string })
            .estimateGasFee,
        ),
        provider,
      );

      const solverFee = await getSolverFee(params.amountToBuy);

      const totalFee = gasCost + solverFee;
      // Update the swap transaction with the new amount
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenTo,
        BigInt(params.amountToBuy) - BigInt(totalFee),
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
      const approveGasCost = await getEstimatedGasCost(
        ESTIMATED_GAS_WALLET[chainId],
        approveTx.to,
        approveTx.data,
        approveTx.value,
        provider,
      );
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );
      const swapGasCost = await getGasCost(
        BigInt(
          (swapTx as TransactionInfo & { estimateGasFee: string })
            .estimateGasFee,
        ),
        provider,
      );
      const totalGasCost = swapGasCost + approveGasCost;

      // Estimate gas cost in ERC20 tokens for the swap transaction
      const erc20GasCost = await this.okxService.getQuote(
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        tokenInAddress,
        totalGasCost,
      );

      const solverFee = await getSolverFee(params.amountToBuy);
      const totalFee = erc20GasCost + solverFee;

      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.requiredTokenAmount = tokens;
      return [approveTx, swapTx];
    }
  }
}
