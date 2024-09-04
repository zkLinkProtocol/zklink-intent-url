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

@RegistryPlug('split-bill', 'v1')
@Injectable()
export class SplitBillService extends ActionDto {
  async getMetadata(): Promise<ActionMetadata> {
    return metadata;
  }

  async generateTransaction(data: {
    code: string;
    sender: string;
    params: ActionTransactionParams;
  }): Promise<GeneratedTransaction> {
    const { params } = data;

    const providerUrl = providerConfig[params.chainId];
    const provider = new JsonRpcProvider(providerUrl);
    let transferTx = { to: params.recipient, data: '0x' };
    if (params.token !== '') {
      const contract = new Contract(params.token, ERC20ABI, provider);
      const decimals = await contract.decimals();
      const amountToSend = parseUnits(params.value.toString(), decimals);
      transferTx = await contract.transfer.populateTransaction(
        params.recipient,
        amountToSend,
      );
    }

    const tx: Tx = {
      chainId: params.chainId,
      to: transferTx.to,
      value: params.token === '' ? params.value.toString() : '0',
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
