import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';

import { METADATA } from './config';
import { intoParams } from './interface';
import { getApproveData, getSwapData } from './okxAPI';

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

    const approveTx = await getApproveData(
      params.chainId,
      params.tokenInAddress,
      ethers.MaxUint256,
    );

    const swapTx = await getSwapData(
      params.userAddress,
      params.chainId,
      params.tokenInAddress,
      params.tokenOutAddress,
      params.amount,
    );

    return {
      txs: [approveTx, swapTx],
      tokens: [
        {
          decimals: 18,
          symbol: 'WBTC',
          chainId: params.chainId,
          token: params.tokenInAddress,
          amount: params.amount.toString(),
        },
      ],
    };
  }
}

const action = new Action();
export default action;
