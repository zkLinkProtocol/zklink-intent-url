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
import { PRE_SALE_ADDRESS } from './config';
import { FieldTypes } from './types';

@RegistryPlug('pre-sale', 'v1')
@Injectable()
export class PreSaleService extends ActionDto<FieldTypes> {
  private preSale: ethers.Contract;
  private provider: ethers.Provider;
  constructor(
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
  ) {
    super();
    this.provider = new ethers.JsonRpcProvider('https://sepolia.rpc.zklink.io');
    this.preSale = new ethers.Contract(
      PRE_SALE_ADDRESS,
      PreSaleABI.abi,
      this.provider,
    );
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'PreSale',
      description:
        '<div>PreSale is a platform for participating in token presales.</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.ZkLinkNovaSepolia,
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
    const tokenAddress = await this.preSale.getCreate2Address(
      formData.tokenName,
      formData.tokenSymbol,
      ethers.parseEther(formData.tokenMaxSupply),
      creator,
      ethers.parseEther(formData.creatorAmount),
      ethers.parseEther(formData.price),
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
        chainId: Chains.ZkLinkNovaSepolia,
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
      ethers.parseEther(formData.price),
      additionalData.code,
    );

    return [
      {
        chainId: Chains.ZkLinkNovaSepolia,
        to: PRE_SALE_ADDRESS,
        value: '0',
        data: createTokenData.data,
        shouldPublishToChain: true,
      },
    ];
  }
}
