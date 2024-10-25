import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJS from 'crypto-js';
import { ethers } from 'ethers';
import { LRUCache } from 'lru-cache';
import fetch from 'node-fetch';

import { TransactionInfo } from 'src/common/dto/transaction.dto';
import { ConfigType } from 'src/config';
import { BusinessException } from 'src/exception/business.exception';
import logger from 'src/logger';
type HeadersParams = {
  'Content-Type': string;
  'OK-ACCESS-KEY': string;
  'OK-ACCESS-SIGN': string;
  'OK-ACCESS-TIMESTAMP': string;
  'OK-ACCESS-PASSPHRASE': string;
};
const apiBaseUrl = 'https://www.okx.com/api/v5/dex/aggregator/';

type TokenType = {
  decimals: string;
  tokenContractAddress: string;
  tokenLogoUrl: string;
  tokenName: string;
  tokenSymbol: string;
};

const options = {
  max: 10000,
  ttl: 60 * 1000,
  allowStale: false,
  ttlAutopurge: true,
};
const cacheToken = new LRUCache<number, TokenType[]>(options);

const ERC20_TRANSFER_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
];

@Injectable()
export class OKXService {
  private readonly okxConfig: ConfigType['okx'];
  constructor(readonly configService: ConfigService) {
    this.okxConfig = configService.get('okx', { infer: true })!;
  }

  public async getApproveData(
    chainId: number,
    tokenInAddress: string,
    amount: bigint,
  ): Promise<TransactionInfo> {
    const approveParam = {
      chainId,
      tokenContractAddress: tokenInAddress,
      approveAmount: amount,
    };

    const approveURL = this.getAggregatorRequestUrl(
      'approve-transaction',
      approveParam,
    );

    const approveToSignUrl = approveURL.replace('https://www.okx.com', '');
    const timestamp = new Date().toISOString();
    const headers = this.getHeaders(timestamp, approveToSignUrl);
    const approveRes = await fetch(approveURL, {
      method: 'get',
      headers,
    });
    const resData = (await approveRes.json()).data[0];

    return {
      chainId,
      to: tokenInAddress,
      value: '0',
      data: resData.data,
      dexContractAddress: resData.dexContractAddress,
      shouldPublishToChain: true,
    };
  }

  public async getQuote(
    chainId: number,
    tokenInAddress: string,
    tokenOutAddress: string,
    amount: bigint,
  ): Promise<bigint> {
    const quoteParams = {
      amount: ethers.parseEther('1'),
      chainId,
      toTokenAddress: tokenOutAddress,
      fromTokenAddress: tokenInAddress,
    };

    const quoteURL = this.getAggregatorRequestUrl('quote', quoteParams);

    const quoteToSignUrl = quoteURL.replace('https://www.okx.com', '');

    const timestamp = new Date().toISOString();
    const headers = this.getHeaders(timestamp, quoteToSignUrl);
    const quoteRes = await fetch(quoteURL, {
      method: 'get',
      headers,
    });
    const resData = (await quoteRes.json()).data[0];
    return (amount * BigInt(resData.toTokenAmount)) / ethers.parseEther('1');
  }

  public async getSwapData(
    userAddress: string,
    chainId: number,
    tokenInAddress: string,
    tokenOutAddress: string,
    amount: bigint,
  ): Promise<
    TransactionInfo & {
      estimateGasFee: string;
    } & {
      tokens: Array<{
        tokenAddress: string;
        amount: string; // raw data, with decimals
        direction?: 'from' | 'to';
      }>;
    }
  > {
    const swapParams = {
      amount,
      chainId,
      toTokenAddress: tokenOutAddress,
      fromTokenAddress: tokenInAddress,
      slippage: '0.005',
      userWalletAddress: userAddress,
    };
    logger.log('swapparams', swapParams.amount);
    const swapURL = this.getAggregatorRequestUrl('swap', swapParams);

    const swapToSignUrl = swapURL.replace('https://www.okx.com', '');

    const timestamp = new Date().toISOString();
    const headers = this.getHeaders(timestamp, swapToSignUrl);
    const swapRes = await fetch(swapURL, {
      method: 'get',
      headers,
    });
    const result: {
      code: string;
      data: {
        routerResult: {
          estimateGasFee: string;
          fromTokenAmount: string;
          toTokenAmount: string;
        };
        tx: { to: string; value: string; data: any };
      }[];
      msg: string;
    } = await swapRes.json();
    logger.log('swapresult:', JSON.stringify(result));

    if (result.code != '0') {
      throw new BusinessException(`okx swap failed: ${result.msg}`);
    }
    const resData = result.data[0];
    const routerResult = resData.routerResult;
    const estimateGasFee = routerResult.estimateGasFee;
    return {
      chainId,
      to: resData.tx.to,
      value: resData.tx.value,
      data: resData.tx.data,

      shouldPublishToChain: true,
      estimateGasFee: estimateGasFee,
      tokens: [
        {
          tokenAddress: tokenInAddress,
          amount: routerResult.fromTokenAmount.toString(),
          direction: 'from',
        },
        {
          tokenAddress: tokenOutAddress,
          amount: routerResult.toTokenAmount.toString(),
          direction: 'to',
        },
      ],
    };
  }

  public async getSupportedChain() {
    const timestamp = new Date().toISOString();
    const supportedUrl = `${apiBaseUrl}supported/chain`;
    const toSignUrl = supportedUrl.replace('https://www.okx.com', '');
    const headers = this.getHeaders(timestamp, toSignUrl);
    const resp = await fetch(supportedUrl, {
      method: 'get',
      headers,
    });
    const chains: {
      code: string;
      data: {
        chainId: string;
        chainName: string;
        dexTokenApproveAddress: string;
      }[];
      msg: string;
    } = await resp.json();
    return chains.data;
  }

  public async getAllTokens(chainId: number) {
    const supportTokens = cacheToken.get(chainId);
    if (supportTokens) {
      return supportTokens;
    }

    const timestamp = new Date().toISOString();
    const allTokenUrl = `${apiBaseUrl}all-tokens?chainId=${chainId}`;
    const toSignUrl = allTokenUrl.replace('https://www.okx.com', '');
    const headers = this.getHeaders(timestamp, toSignUrl);

    const resp = await fetch(allTokenUrl, {
      method: 'get',
      headers,
    });
    const tokens: {
      code: string;
      data: TokenType[];
      msg: string;
    } = await resp.json();

    if (tokens.code != '0') {
      logger.error(
        `okx get supportToken failed,chainId:${chainId},msg:${tokens.msg}`,
      );
      throw new BusinessException('okx get supportToken failed');
    }
    cacheToken.set(chainId, tokens.data);
    return tokens.data;
  }

  private getAccessSign(
    timestamp: string,
    url: string,
    secret_key: string,
  ): string {
    return CryptoJS.enc.Base64.stringify(
      // The field order of headersParams should be consistent with the order of quoteParams.
      // example : quote  ==>   cryptoJS.HmacSHA256(timestamp + 'GET' + '/api/v5/dex/aggregator/quote?amount=1000000&chainId=1&toTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&fromTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', secretKey)
      CryptoJS.HmacSHA256(timestamp + 'GET' + url, secret_key),
    );
  }

  private getHeaders(timestamp: string, toSignUrl: string): HeadersParams {
    return {
      'Content-Type': 'application/json',
      // The api Key obtained from the previous application
      'OK-ACCESS-KEY': this.okxConfig.accessKey,
      'OK-ACCESS-SIGN': this.getAccessSign(
        timestamp,
        toSignUrl,
        this.okxConfig.secretKey,
      ),
      // Convert the current time to the desired format
      'OK-ACCESS-TIMESTAMP': timestamp,
      // The password created when applying for the key
      'OK-ACCESS-PASSPHRASE': this.okxConfig.passphrase,
    };
  }

  private getAggregatorRequestUrl(methodName: string, queryParams: any) {
    return (
      apiBaseUrl +
      methodName +
      '?' +
      new URLSearchParams(queryParams).toString()
    );
  }
}
