import { RegistryPlug } from '@action/registry';
import { getERC20SymbolAndDecimals } from '@action/utils';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Token,
  Tx,
} from 'src/common/dto';

import {
  ESTIMATED_GAS_WALLET,
  METADATA,
  RPC_URL,
  TOKEN_CONFIG,
} from './config';
import { intoParams } from './interface';
import { getApproveData, getSwapData } from './okxAPI';
import {
  getERC20GasCost,
  getEstimatedGasCost,
  getGasCost,
  getSolverFee,
} from './utils';

@RegistryPlug('cross-chain-swap', 'v1')
@Injectable()
export class CrossChainSwapService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params: _params, sender } = data;
    const params = intoParams(_params);
    let approveTx: Tx;
    let swapTx: Tx;
    const tokenInAddress = TOKEN_CONFIG[_params.chainId][_params.tokenIn];
    const provider = new ethers.JsonRpcProvider(
      RPC_URL[params.chainId.toString()],
    ) as any;

    const { symbol, decimals } = await getERC20SymbolAndDecimals(
      provider,
      tokenInAddress,
    );
    const tokens = [
      {
        decimals,
        symbol,
        chainId: params.chainId,
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (_params.tokenIn === 'weth') {
      console.log(params);
      console.log(sender);
      swapTx = await getSwapData(
        sender,
        params.chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenOutAddress,
        params.amountToBuy,
      );
      const gasCost = await getGasCost(
        BigInt((swapTx as Tx & { estimateGasFee: string }).estimateGasFee),
        provider,
      );

      const solverFee = await getSolverFee(params.amountToBuy);

      const totalFee = gasCost + solverFee;
      // Update the swap transaction with the new amount
      swapTx = await getSwapData(
        sender,
        params.chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.dataObject = {
        ...swapTx.dataObject,
        amount: (BigInt(params.amountToBuy) - BigInt(totalFee)).toString(),
      };
      return {
        txs: [swapTx],
        tokens,
      };
    } else {
      //buy
      approveTx = await getApproveData(
        params.chainId,
        tokenInAddress,
        ethers.MaxUint256,
      );
      const approveGasCost = await getEstimatedGasCost(
        ESTIMATED_GAS_WALLET[params.chainId],
        approveTx.to,
        approveTx.data,
        approveTx.value,
        provider,
      );
      swapTx = await getSwapData(
        sender,
        params.chainId,
        tokenInAddress,
        params.tokenOutAddress,
        params.amountToBuy,
      );
      const swapGasCost = await getGasCost(
        BigInt((swapTx as Tx & { estimateGasFee: string }).estimateGasFee),
        provider,
      );
      const totalGasCost = swapGasCost + approveGasCost;

      // Estimate gas cost in ERC20 tokens for the swap transaction
      const erc20GasCost = await getERC20GasCost(
        params.chainId,
        totalGasCost,
        tokenInAddress,
      );

      const solverFee = await getSolverFee(params.amountToBuy);
      const totalFee = erc20GasCost + solverFee;

      swapTx = await getSwapData(
        sender,
        params.chainId,
        tokenInAddress,
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.dataObject = {
        ...swapTx.dataObject,
        amount: (BigInt(params.amountToBuy) - BigInt(totalFee)).toString(),
      };
      return {
        txs: [approveTx, swapTx],
        tokens,
      };
    }
  }
}
