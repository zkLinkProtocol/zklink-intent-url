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
import { getERC20GasCost, getEstimatedGasCost, getGasCost } from './utils';

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

      // Update the swap transaction with the new amount
      swapTx = await getSwapData(
        sender,
        params.chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(gasCost),
      );
      swapTx.dataObject = {
        ...swapTx.dataObject,
        amount: (BigInt(params.amountToBuy) - BigInt(gasCost)).toString(),
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

      swapTx = await getSwapData(
        sender,
        params.chainId,
        tokenInAddress,
        params.tokenOutAddress,
        BigInt(params.amountToBuy) - BigInt(erc20GasCost),
      );
      swapTx.dataObject = {
        ...swapTx.dataObject,
        amount: (BigInt(params.amountToBuy) - BigInt(erc20GasCost)).toString(),
      };
      return {
        txs: [approveTx, swapTx],
        tokens,
      };
    }
  }
}
