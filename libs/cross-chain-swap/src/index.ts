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

import { METADATA, RPC_URL, TOKEN_CONFIG } from './config';
import { intoParams } from './interface';
import { getApproveData, getSwapData } from './okxAPI';
import { getUserERC20Balance } from './utils';

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
    const { symbol, decimals } = await getERC20SymbolAndDecimals(
      new ethers.JsonRpcProvider(RPC_URL[params.chainId.toString()]) as any,
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

      swapTx = await getSwapData(
        sender,
        params.chainId,
        tokenInAddress,
        params.tokenOutAddress,
        params.amountToBuy,
      );
      return {
        txs: [approveTx, swapTx],
        tokens,
      };
    }
  }
}
