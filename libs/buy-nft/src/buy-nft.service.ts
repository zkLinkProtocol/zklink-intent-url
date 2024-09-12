import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import { apiConfig, metadata } from './config';
import { FormName } from './types';

@RegistryPlug('buy-nft', 'v1')
@Injectable()
export class BuyNftService extends ActionDto<FormName> {
  nftName = '';
  nftHtmlInfo = '';

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
    const queryParams =
      formData.queryType == 'contract'
        ? `id=${formData.queryValue}`
        : `slug=${encodeURIComponent(formData.queryValue.substring(formData.queryValue.lastIndexOf('/') + 1))}`;
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
    const floorOrderId = nftInfo[0]['floorAsk']['id'];
    if (!floorOrderId) {
      throw new Error('No sale order for given NFT');
    }

    const floorPrice = nftInfo[0]['floorAsk']['price']['amount']['decimal'];
    const priceSymbol = nftInfo[0]['floorAsk']['price']['currency']['symbol'];
    const floorToken = nftInfo[0]['floorAsk']['token'];
    this.nftName = `${floorToken['name']}`;
    this.nftHtmlInfo = `<img src="${floorToken['image']}"><p>Price: ${floorPrice} ${priceSymbol}</p>`;

    const txs: TransactionInfo[] = [];
    const buyResp = await fetch(`${MAGIC_EDEN_API}execute/buy/v7`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            orderId: floorOrderId,
          },
        ],
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

  public async getRealTimeContent(data: {
    code: string;
    sender: string;
  }): Promise<{ title: string; content: string }> {
    return {
      title: this.nftName,
      content: this.nftHtmlInfo,
    };
  }
}
