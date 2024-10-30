import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import {
  Action as ActionDto,
  ActionMetadata,
  BasicAdditionalParams,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { apiConfig } from './config';
import { FieldTypes } from './types';

@RegistryPlug('buy-nft-magic-eden', 'v1')
@Injectable()
export class BuyNftMagicEdenService extends ActionDto<FieldTypes> {
  nftHtmlInfo: string[] = [];

  constructor(private readonly chainService: ChainService) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Buy NFT from Magic Eden',
      description:
        '<div>This action allows you to buy NFT from Magic Eden</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.EthereumMainnet,
        Chains.Base,
        Chains.ArbitrumOne,
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
                label: 'Magic Eden Collection URL',
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
            desc: 'Enter the contract address or URL (e.g., https://magiceden.io/collections/ethereum/cryptopunks)',
            type: 'input',
            regex:
              '^(0x[a-fA-F0-9]{40}(:\\d+)?)|(https?://magiceden..+/collections/.+)$',
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
    const MAGIC_EDEN_API = (apiConfig as any)[additionalData.chainId];
    let collection = formData.queryValue;
    if (formData.queryType == 'link') {
      const queryParams = `slug=${encodeURIComponent(formData.queryValue.substring(formData.queryValue.lastIndexOf('/') + 1))}`;
      const queryResp = await fetch(
        `${MAGIC_EDEN_API}collections/v7?${queryParams}&limit=1`,
        {
          method: 'get',
        },
      );
      const nftInfo = (await queryResp.json()).collections;
      if (nftInfo.length == 0) {
        throw new Error('NFT Not Found');
      }
      collection = nftInfo[0]['id'];
    }

    const quantity = Number(formData.quantity);
    const queryResp = await fetch(
      `${MAGIC_EDEN_API}tokens/v6?collection=${collection}&limit=${quantity}`,
      {
        method: 'get',
      },
    );
    const nftInfo = (await queryResp.json()).tokens;
    if (nftInfo.length < quantity) {
      throw new Error("Don't have enough items for sale at the moment");
    }
    const floorOrderIds = nftInfo.map((info: any) => {
      const floorAsk = info['market']['floorAsk'];
      const floorOrderId = floorAsk['id'];
      if (!floorOrderId) {
        throw new Error('No sale order for given NFT');
      }
      const floorPrice = floorAsk['price']['amount']['decimal'];
      const priceSymbol = floorAsk['price']['currency']['symbol'];
      this.nftHtmlInfo.push(
        `<p>${info['token']['name']}<br>Price: ${floorPrice} ${priceSymbol}</p><img src="${info['token']['imageSmall']}">`,
      );
      return {
        orderId: floorOrderId,
      };
    });

    const txs: TransactionInfo[] = [];
    const buyResp = await fetch(`${MAGIC_EDEN_API}execute/buy/v7`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: floorOrderIds,
        taker: additionalData.account,
        skipBalanceCheck: true,
      }),
    });
    const buySteps = (await buyResp.json()).steps;
    for (const step of buySteps) {
      if (step['kind'] == 'transaction') {
        for (const item of step['items']) {
          txs.push({
            chainId: additionalData.chainId,
            to: item['data']['to'],
            value: item['data']['value'],
            data: item['data']['data'],
            shouldPublishToChain: true,
          });
        }
      }
    }
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
