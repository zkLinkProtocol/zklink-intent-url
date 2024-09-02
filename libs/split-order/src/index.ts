import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider, parseUnits } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  ActionTransactionParams,
  GeneratedTransaction,
  Tx,
} from 'src/common/dto';

import ERC20ABI from './abis/ERC20.json';
import { metadata, providerConfig } from './config';
import { intoParams } from './interface';

@RegistryPlug('split-order', 'v1')
@Injectable()
export class SliptOrderService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return metadata;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params: _params } = data;

    const params = intoParams(_params);
    const providerUrl = providerConfig[params.chainId];
    const provider = new JsonRpcProvider(providerUrl);
    const contract = new Contract(params.token, ERC20ABI, provider);
    const decimals = await contract.decimals();
    const amountToSend = parseUnits(params.value.toString(), decimals);
    const transferTx = await contract.transfer.populateTransaction(
      params.recipient,
      amountToSend,
    );

    const tx: Tx = {
      chainId: params.chainId,
      to: transferTx.to,
      value: '0',
      data: transferTx.data,
      dataObject: {
        Token: params.token.toString(),
        'Sent TOKEN': params.value.toString(),
        To: params.recipient,
      },
      shouldSend: true,
    };
    return {
      txs: [tx],
      tokens: [],
    };
  }
}
