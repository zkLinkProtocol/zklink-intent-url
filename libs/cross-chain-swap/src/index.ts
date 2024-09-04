import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import {
  ESTIMATED_GAS_WALLET,
  METADATA,
  RPC_URL,
  TOKEN_CONFIG,
} from './config';
import { getApproveData, getSwapData } from './okxAPI';
import { FormName } from './types';
import {
  getERC20GasCost,
  getEstimatedGasCost,
  getGasCost,
  getSolverFee,
} from './utils';

@RegistryPlug('cross-chain-swap', 'v1')
@Injectable()
export class CrossChainSwapService extends ActionDto<FormName> {
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
    const tokenInAddress = TOKEN_CONFIG[additionalData.chainId][params.tokenIn];
    const provider = new ethers.JsonRpcProvider(RPC_URL[chainId]) as any;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (params.tokenIn === 'weth') {
      console.log(params);
      console.log(account);
      swapTx = await getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenOutAddress,
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
      swapTx = await getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(totalFee),
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
      const approveGasCost = await getEstimatedGasCost(
        ESTIMATED_GAS_WALLET[chainId],
        approveTx.to,
        approveTx.data,
        approveTx.value,
        provider,
      );
      swapTx = await getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenOutAddress,
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
      const erc20GasCost = await getERC20GasCost(
        chainId,
        totalGasCost,
        tokenInAddress,
      );

      const solverFee = await getSolverFee(params.amountToBuy);
      const totalFee = erc20GasCost + solverFee;

      swapTx = await getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.requiredTokenAmount = tokens;
      return [approveTx, swapTx];
    }
  }
}
