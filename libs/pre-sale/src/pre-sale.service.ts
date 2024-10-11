import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { RegistryPlug } from '@action/registry';
import { DataService } from '@core/data';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import PreSaleABI from './abis/PreSale.json';
import TokenABI from './abis/Token.json';
import { CHAIN_ID, PRE_SALE_ADDRESS, metadata } from './config';
import { FieldTypes } from './types';

@RegistryPlug('pre-sale', 'v1')
@Injectable()
export class PreSaleService extends ActionDto<FieldTypes> {
  private preSale: ethers.Contract;
  private provider: ethers.Provider;
  constructor(private readonly dataService: DataService) {
    super();
    this.provider = new ethers.JsonRpcProvider('https://sepolia.rpc.zklink.io');
    this.preSale = new ethers.Contract(
      PRE_SALE_ADDRESS,
      PreSaleABI.abi,
      this.provider,
    );
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const creatorInfo = await this.dataService.getMagicLinkCreatorInfoByCode(
      additionalData.code!,
    );
    if (!creatorInfo) {
      throw new Error('Creator information not found for the given code.');
    }
    const creator = creatorInfo.address;
    const tokenAddress = await this.preSale.getCreate2Address(
      formData.tokenName,
      formData.tokenSymbol,
      ethers.parseEther(formData.tokenMaxSupply),
      creator,
      ethers.parseEther(formData.creatorAmount),
      Number(formData.price),
      additionalData.code,
    );

    const token = new ethers.Contract(
      tokenAddress,
      TokenABI.abi,
      this.provider,
    );

    const buy = await token.buy.populateTransaction();
    return [
      {
        chainId: CHAIN_ID,
        to: tokenAddress,
        value: ethers.parseEther(formData.offerAmount).toString(),
        data: buy.data,
        shouldPublishToChain: true,
      },
    ];
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const createTokenData = await this.preSale.createToken.populateTransaction(
      formData.tokenName,
      formData.tokenSymbol,
      ethers.parseEther(formData.tokenMaxSupply),
      ethers.parseEther(formData.creatorAmount),
      Number(formData.price),
      additionalData.code,
    );

    return [
      {
        chainId: CHAIN_ID,
        to: PRE_SALE_ADDRESS,
        value: '0',
        data: createTokenData.data,
        shouldPublishToChain: true,
      },
    ];
  }
}
