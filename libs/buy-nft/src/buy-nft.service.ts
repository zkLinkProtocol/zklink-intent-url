import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import {
  Action as ActionDto,
  BasicAdditionalParams,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { apiConfig, metadata } from './config';
import { FormName } from './types';

@RegistryPlug('buy-nft', 'v1')
@Injectable()
export class BuyNftService extends ActionDto<FormName> {
  nftHtmlInfo: string[] = [];

  constructor() {
    super();
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    if (!additionalData.account) {
      throw new Error('Missing account!');
    }
    const MAGIC_EDEN_API = apiConfig[additionalData.chainId];
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
    return txs;
  }

  public async reloadAdvancedInfo(
    data: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    return {
      title: 'NFT Info',
      content: this.nftHtmlInfo.join('<br>'),
    };
  }
}
