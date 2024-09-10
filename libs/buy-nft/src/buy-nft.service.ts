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
    const MAGIC_EDEN_API = apiConfig[additionalData.chainId];
    const queryParams = Object.entries(formData)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');
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
    console.log(
      `Floor Price ${floorPrice} ${priceSymbol} with OrderId ${floorOrderId}`,
    );

    const txs: TransactionInfo[] = [];
    const taker = additionalData.account;
    const buyResp = await fetch(`${MAGIC_EDEN_API}execute/buy/v7`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        items: [
          {
            orderId: floorOrderId,
          },
        ],
        taker: taker,
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
}
