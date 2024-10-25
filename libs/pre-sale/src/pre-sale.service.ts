import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { RegistryPlug } from '@action/registry';
import { ChainService, DataService } from '@core/shared';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import PreSaleABI from './abis/PreSale.json';
import TokenABI from './abis/Token.json';
import { PRE_SALE_ADDRESSES } from './config';
import { FieldTypes } from './types';

@RegistryPlug('pre-sale', 'v1')
@Injectable()
export class PreSaleService extends ActionDto<FieldTypes> {
  constructor(
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
  ) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'PreSale',
      description:
        '<div>PreSale is a platform for participating in token presales.</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.ZkLinkNovaSepolia,
        Chains.Base,
        Chains.ArbitrumOne,
        Chains.OpMainnet,
        Chains.Mantle,
      ]),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {},
      intent: {
        binding: 'offerAmount',
        components: [
          {
            name: 'tokenName',
            label: 'Token Name',
            desc: 'The name of the token',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Token Name',
          },
          {
            name: 'tokenSymbol',
            label: 'Token Symbol',
            desc: 'The symbol of the token',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Token Symbol',
          },
          {
            name: 'tokenMaxSupply',
            label: 'Max Supply',
            desc: 'The max supply of the token',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Token Max Supply',
          },
          {
            name: 'creatorAmount',
            label: 'Creator Amount',
            desc: 'The amount of tokens the creator will receive',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Creator Amount',
          },
          {
            name: 'price',
            label: 'Price',
            desc: 'The amount of ETH required to purchase one token',
            type: 'input',
            regex: '^[0-9]+(\\.[0-9]+)?$',
            regexDesc: 'Price',
          },
          {
            name: 'offerAmount',
            label: 'Offer Amount',
            desc: 'The amount of ETH the user wants to use to purchase tokens',
            type: 'input',
            regex: '^[0-9]+(\\.[0-9]+)?$',
            regexDesc: 'Offer Amount',
          },
        ],
      },
    };
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
    const provider = this.chainService.getProvider(additionalData.chainId);
    const preSale = new ethers.Contract(
      PRE_SALE_ADDRESSES[
        additionalData.chainId as keyof typeof PRE_SALE_ADDRESSES
      ],
      PreSaleABI.abi,
      provider,
    );
    let tokenAddress;
    if (additionalData.chainId === Chains.ZkLinkNovaSepolia) {
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
    const provider = this.chainService.getProvider(additionalData.chainId);
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
