import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import ERC721ABI from './abis/ERC721.json';
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
    const contract = new Contract(
      formData.contract.toString(),
      ERC721ABI,
      provider,
    );
    let mintTx;
    if (formData.quantity == '0') {
      mintTx = await contract['mint(address)'].populateTransaction(
        additionalData.account,
      );
    } else {
      mintTx = await contract['mint(address, uint256)'].populateTransaction(
        additionalData.account,
        Number(formData.quantity),
      );
    }
    const tx: TransactionInfo = {
      chainId: chainId,
      to: mintTx.to,
      value: '0',
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return [tx];
  }
}
