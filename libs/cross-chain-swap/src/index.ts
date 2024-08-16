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
import { TOKEN_CONFIG } from './config';
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
    const { params: _params, sender } = data;
    const tokenInAddress = TOKEN_CONFIG[_params.chainId][_params.tokenIn];
    const params = intoParams(_params);
    let approveTx: Tx;
    let swapTx: Tx;
    let tokens: Token[];

    if (params.amountToBuy) {
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
      const { symbol, decimals } = await getERC20SymbolAndDecimals(
        new ethers.JsonRpcProvider(RPC_URL[params.chainId.toString()]) as any,
        tokenInAddress,
      );
      tokens = [
        {
          decimals,
          symbol,
          chainId: params.chainId,
          token: tokenInAddress,
          amount: params.amountToBuy.toString(),
        },
      ];
    } else {
      //sell
      let amount = params.amountToSell;
      if (params.amountToSell) {
        amount = params.amountToSell;
      } else {
        const balance = await getUserERC20Balance(
          sender,
          params.tokenOutAddress,
          new ethers.JsonRpcProvider(RPC_URL[params.chainId.toString()]),
        );
        amount = (balance * BigInt(params.percentToSell)) / BigInt(100);
      }

      approveTx = await getApproveData(
        params.chainId,
        params.tokenOutAddress,
        ethers.MaxUint256,
      );

      swapTx = await getSwapData(
        sender,
        params.chainId,
        params.tokenOutAddress,
        tokenInAddress,
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
