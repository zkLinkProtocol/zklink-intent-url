import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import { RegistryPlug } from '@action/registry';
import { DataService } from '@core/shared';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import PreSaleABI from './abis/PreSale.json';
import TokenABI from './abis/Token.json';
import { PRE_SALE_ADDRESSES, RPC_URLS, metadata } from './config';
import { FieldTypes } from './types';

@RegistryPlug('pre-sale', 'v1')
@Injectable()
export class PreSaleService extends ActionDto<FieldTypes> {
  private logger: Logger = new Logger(PreSaleService.name);
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
    const creatorInfo = await this.dataService.getMagicLinkCreatorInfoByCode(
      additionalData.code!,
    );
    if (!creatorInfo) {
      throw new Error('Creator information not found for the given code.');
    }
    const creator = creatorInfo.address;

    let tokenAddress;
    const provider = new ethers.JsonRpcProvider(
      RPC_URLS[additionalData.chainId as keyof typeof RPC_URLS],
    );
    const preSale = new ethers.Contract(
      PRE_SALE_ADDRESSES[
        additionalData.chainId as keyof typeof PRE_SALE_ADDRESSES
      ],
      PreSaleABI.abi,
      provider,
    );

    if (additionalData.chainId == 810181) {
      tokenAddress = await preSale.getCreate2Address(
        formData.tokenName,
        formData.tokenSymbol,
        ethers.parseEther(formData.tokenMaxSupply),
        creator,
        ethers.parseEther(formData.creatorAmount),
        ethers.parseEther(formData.price),
        additionalData.code,
      );
    } else {
      tokenAddress = await preSale.getEVMCreate2Address(
        formData.tokenName,
        formData.tokenSymbol,
        ethers.parseEther(formData.tokenMaxSupply),
        creator,
        ethers.parseEther(formData.creatorAmount),
        ethers.parseEther(formData.price),
        additionalData.code,
      );
    }

    const token = new ethers.Contract(tokenAddress, TokenABI.abi, provider);

    const buy = await token.buy.populateTransaction();
    return [
      {
        chainId: additionalData.chainId,
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
    this.logger.log(`onMagicLinkCreated ${additionalData.chainId}`);
    const provider = new ethers.JsonRpcProvider(
      RPC_URLS[additionalData.chainId as keyof typeof RPC_URLS],
    );
    const preSale = new ethers.Contract(
      PRE_SALE_ADDRESSES[
        additionalData.chainId as keyof typeof PRE_SALE_ADDRESSES
      ],
      PreSaleABI.abi,
      provider,
    );
    const createTokenData = await preSale.createToken.populateTransaction(
      formData.tokenName,
      formData.tokenSymbol,
      ethers.parseEther(formData.tokenMaxSupply),
      ethers.parseEther(formData.creatorAmount),
      ethers.parseEther(formData.price),
      additionalData.code,
    );

    return [
      {
        chainId: additionalData.chainId,
        to: PRE_SALE_ADDRESSES[
          additionalData.chainId as keyof typeof PRE_SALE_ADDRESSES
        ],
        value: '0',
        data: createTokenData.data,
        shouldPublishToChain: true,
      },
    ];
  }
}
