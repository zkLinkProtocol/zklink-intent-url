import { RegistryPlug } from '@action/registry';
import { ChainService, OKXService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import {
  Action as ActionDto,
  ActionMetadata,
  BasicAdditionalParams,
  GenerateTransactionParams,
  GenerateTransactionResponse,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { okxChainAlias, okxChainName } from './config';
import { FieldTypes } from './types';

@RegistryPlug('buy-nft-okx', 'v1')
@Injectable()
export class BuyNftOKXService extends ActionDto<FieldTypes> {
  nftHtmlInfo: string[] = [];

  constructor(
    private readonly okxService: OKXService,
    private readonly chainService: ChainService,
  ) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Buy NFT from OKX Marketplace',
      description:
        '<div>This action allows you to buy NFT from OKX Marketplace</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.EthereumMainnet,
        Chains.ArbitrumOne,
        Chains.Base,
        Chains.BSCMainnet,
        Chains.OpMainnet,
        Chains.Linea,
        Chains.ScrollMainnet,
        Chains.ZkSync,
      ]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        description: '',
      },
      intent: {
        binding: 'quantity',
        components: [
          {
            name: 'queryType',
            label: 'NFT Query Method',
            desc: 'Specify how to find the NFT',
            type: 'searchSelect',
            options: [
              {
                label: 'OKX Collection URL',
                value: 'link',
              },
              {
                label: 'Contract Address',
                value: 'contract',
              },
            ],
          },
          {
            name: 'queryValue',
            label: 'NFT Query Value',
            desc: 'Enter the contract address or URL (e.g., https://www.okx.com/web3/marketplace/nft/collection/eth/cryptopunks)',
            type: 'input',
            regex:
              '^(0x[a-fA-F0-9]{40}(:\\d+)?)|(https?://www.okx.com/web3/marketplace/nft/collection.+)$',
            regexDesc: 'NFT Query Value',
          },
          {
            name: 'quantity',
            label: 'Quantity',
            desc: 'Quantity of NFTs to buy',
            type: 'input',
            regex: '^\\d+$',
            regexDesc: 'Quantity',
            defaultValue: '1',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    if (!additionalData.account) {
      throw new Error('Missing account!');
    }
    let collection = formData.queryValue;
    if (formData.queryType == 'link') {
      const slug = formData.queryValue.substring(
        formData.queryValue.lastIndexOf('/') + 1,
      );
      collection = await this.okxService.getNFTCollectionAddress(
        slug,
        (okxChainName as any)[additionalData.chainId],
      );
    }

    const quantity = Number(formData.quantity);
    const { offers, nftHtmlInfo } = await this.okxService.getNFTListing(
      (okxChainAlias as any)[additionalData.chainId],
      collection,
      quantity,
    );
    if (offers.length < quantity) {
      throw new Error("Don't have enough items for sale at the moment");
    }
    this.nftHtmlInfo = nftHtmlInfo;
    const txs = await this.okxService.buyNFT(
      (okxChainAlias as any)[additionalData.chainId],
      offers,
      additionalData.account,
    );
    return { transactions: txs };
  }

  public async reloadAdvancedInfo(
    _: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    return {
      title: 'NFT Info',
      content: this.nftHtmlInfo.join('<br>'),
    };
  }
}
