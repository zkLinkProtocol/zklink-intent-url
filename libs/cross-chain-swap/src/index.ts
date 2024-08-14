import { getERC20SymbolAndDecimals } from '@action/utils';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Token,
  Tx,
} from 'src/common/dto';

import { METADATA, RPC_URL } from './config';
import { intoParams } from './interface';
import { getApproveData, getSwapData } from './okxAPI';
import { getUserERC20Balance } from './utils';

class Action extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params: _params } = data;
    const params = intoParams(_params);
    let approveTx: Tx;
    let swapTx: Tx;
    let tokens: Token[];

    if (params.isBuy) {
      //buy
      approveTx = await getApproveData(
        params.chainId,
        params.tokenInAddress,
        ethers.MaxUint256,
      );

      swapTx = await getSwapData(
        params.userAddress,
        params.chainId,
        params.tokenInAddress,
        params.tokenOutAddress,
        params.amount,
      );
      const { symbol, decimals } = await getERC20SymbolAndDecimals(
        new ethers.JsonRpcProvider(RPC_URL[params.chainId.toString()]) as any,
        params.tokenInAddress,
      );
      tokens = [
        {
          decimals,
          symbol,
          chainId: params.chainId,
          token: params.tokenInAddress,
          amount: params.amount.toString(),
        },
      ];
    } else {
      //sell
      let amount = params.amount;
      if (params.percentOrAmount === 'percent') {
        const balance = await getUserERC20Balance(
          params.userAddress,
          params.tokenOutAddress,
          new ethers.JsonRpcProvider(RPC_URL[params.chainId.toString()]),
        );
        amount = (balance * BigInt(params.amount)) / BigInt(100);
      }

      approveTx = await getApproveData(
        params.chainId,
        params.tokenOutAddress,
        ethers.MaxUint256,
      );

      swapTx = await getSwapData(
        params.userAddress,
        params.chainId,
        params.tokenOutAddress,
        params.tokenInAddress,
        amount,
      );
      tokens = [];
    }

    return {
      txs: [approveTx, swapTx],
      tokens,
    };
  }
}

const action = new Action();
export default action;
