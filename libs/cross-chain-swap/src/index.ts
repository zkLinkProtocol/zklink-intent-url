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
class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(
    _params: ActionTransactionParams,
  ): Promise<GeneratedTransaction> {
    const params = intoParams(_params);
    let approveTx: Tx;
    let swapTx: Tx;
    let tokens: Token[];
    if (params.isBuy) {
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
      tokens = [
        {
          decimals: 18,
          symbol: 'WBTC',
          chainId: params.chainId,
          token: params.tokenInAddress,
          amount: params.amount.toString(),
        },
      ];
    } else {
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
