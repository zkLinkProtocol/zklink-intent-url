import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { Contract, Interface, JsonRpcProvider } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { metadata, providerConfig } from './config';
import { FieldTypes } from './types';

@RegistryPlug('mint-nft', 'v1')
@Injectable()
export class MintNftService extends ActionDto<FieldTypes> {
  constructor() {
    super();
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId } = additionalData;
    const providerUrl = providerConfig[chainId];
    const provider = new JsonRpcProvider(providerUrl);

    const payable = Number(formData.value) > 0 ? ' payable' : '';
    const abiParams = [];
    const funcParams = [];
    const txParams = [];
    if (formData.recipient != 'none') {
      abiParams.push('address recipient');
      funcParams.push('address');
      if (formData.recipient == 'sender') {
        txParams.push(additionalData.account);
      } else {
        txParams.push(formData.recipient);
      }
    }
    if (Number(formData.quantity) > 0) {
      abiParams.push('uint quantity');
      funcParams.push('uint');
      txParams.push(Number(formData.quantity));
    }
    if (formData.ext != 'none') {
      abiParams.push('string ext');
      funcParams.push('string');
      txParams.push(formData.ext);
    }
    const abi = new Interface([
      `function ${formData.entrypoint}(${abiParams.join(',')})${payable}`,
    ]);

    const contract = new Contract(formData.contract.toString(), abi, provider);
    const mintTx = await contract[
      `${formData.entrypoint}(${funcParams.join(',')})`
    ].populateTransaction.apply(this, txParams);
    const tx: TransactionInfo = {
      chainId: chainId,
      to: mintTx.to,
      value: formData.value,
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return [tx];
  }
}
