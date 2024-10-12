import { RegistryPlug } from '@action/registry';
import { DataService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider, ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';

import ERC721ABI from './abis/ERC721.json';
import { contractConfig, metadata, providerConfig } from './config';
import { FieldTypes } from './types';

@RegistryPlug('mint-nova-nft', 'v1')
@Injectable()
export class MintNovaNftService extends ActionDto<FieldTypes> {
  constructor(private readonly dataService: DataService) {
    super();
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { code, chainId } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }

    //mock gets the list of addresses from the whitelisted address service
    const whiteAddressList = ['0xF0DB7cE565Cd7419eC2e6548603845a648f6594F'];
    if (!whiteAddressList.includes(formData.recipient)) {
      throw new Error('You are not entitled to mint');
    }

    const provider = new JsonRpcProvider(providerConfig[chainId]);
    const nftContractAddress = contractConfig[chainId];

    const contract = new Contract(nftContractAddress, ERC721ABI, provider);
    const mintedCount = Number(
      await contract.getUserMintedCount(formData.recipient),
    );
    if (mintedCount >= 2) {
      throw new Error('The maximum number of mint has been reached');
    }

    let tokenId = Number(formData.tokenId);
    const result = await this.dataService.findRecordByCode(code);
    if (result) {
      const intentionRecordTxs: IntentionRecordTx[] = result
        .map((r) => r.intentionRecordTxs)
        .flat();
      for (const recordTx of intentionRecordTxs) {
        if (recordTx.status === IntentionRecordTxStatus.SUCCESS) {
          tokenId++;
        }
      }
    }

    const expiry = Math.round(Date.now() / 1000) + 60 * 60;
    const domain = {
      name: 'OKXMint',
      version: '1.0',
      chainId,
      verifyingContract: nftContractAddress,
    };
    const types = {
      MintAuth: [
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'amount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'expiry', type: 'uint256' },
      ],
    };
    const message = {
      to: formData.recipient,
      tokenId,
      amount: 1,
      nonce: tokenId,
      expiry,
    };
    const signer = new ethers.Wallet(formData.key);
    const signature = signer.signTypedData(domain, types, message);

    const mintTx = await contract.publicMint.populateTransaction(
      formData.recipient,
      tokenId,
      1,
      tokenId,
      expiry,
      signature,
    );
    const tx: TransactionInfo = {
      chainId,
      to: mintTx.to,
      value: ethers.parseEther(formData.fee).toString(),
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return [tx];
  }
}
