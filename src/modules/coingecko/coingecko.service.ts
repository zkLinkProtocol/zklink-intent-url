import { Logger } from '@nestjs/common';

import configFactory from 'src/config';

import { transferChainIdToCgId } from './ids';

export class CoingeckoService {
  private endpoint = 'https://api.coingecko.com/api/v3';

  logger: Logger = new Logger('TgbotController');

  transfChainidToCgid(chainid: number) {
    return transferChainIdToCgId(chainid);
  }

  /**
   * https://docs.coingecko.com/v3.0.1/reference/coins-contract-address
   * @param id
   * @param contractAddress
   * @returns Object
   */
  async getCoinDataByTokenAddress(id: string, contractAddress: string) {
    const url = `${this.endpoint}/coins/${id}/contract/${contractAddress}`;
    const responseJson = await this.executeRequest(url, 'get');
    // if error
    if (responseJson.error) {
      this.logger.error(
        `CoingeckoService : getCoinDataByTokenAddress error. url:${url}, id:${id}, contractAddress:${contractAddress}, error:${responseJson.error}`,
      );
      return null;
    }
    return responseJson;
  }

  private async executeRequest(url: string, method: string, body?: any) {
    const config = await configFactory();
    const apiKey = config.coingecko.apiKey;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}
