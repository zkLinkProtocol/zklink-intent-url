import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';

import { METADATA } from './config';
import { intoParams } from './interface';
import { getSwapData } from './okxAPI';

class Action implements ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return METADATA;
  }

  async generateTransaction(
    _params: ActionTransactionParams,
  ): Promise<GeneratedTransaction> {
    const params = intoParams(_params);

    //TODO test
    // const approveTx = await getApproveData(
    //   params.chainId,
    //   params.tokenInAddress,
    //   params.amount,
    // );

    // TODO: user address
    const swapTx = await getSwapData(
      params.userAddress,
      params.chainId,
      params.tokenInAddress,
      params.tokenOutAddress,
      params.amount,
    );

    return {
      txs: [swapTx],
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
