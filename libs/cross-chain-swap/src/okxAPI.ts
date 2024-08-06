import CryptoJS from 'crypto-js';
import fetch from 'node-fetch';
import { Tx } from 'src/common/dto/transaction.dto';

type HeadersParams = {
  'Content-Type': string;
  'OK-ACCESS-KEY': string;
  'OK-ACCESS-SIGN': string;
  'OK-ACCESS-TIMESTAMP': string;
  'OK-ACCESS-PASSPHRASE': string;
};

const apiBaseUrl = 'https://www.okx.com/api/v5/dex/aggregator/';
const SECREAT_KEY = '7674652439B4876417E1238DAB0538B9';
const ACCESS_KEY = '4a194686-dde0-4f5f-b7a7-50ba24564c91';
const PASSPHRASE = '46112341Hcj!';

export async function getApproveData(
  chainId: number,
  tokenInAddress: string,
  amount: bigint,
): Promise<Tx> {
  const approveParam = {
    chainId,
    tokenContractAddress: tokenInAddress,
    approveAmount: amount,
  };

  const approveURL = getAggregatorRequestUrl(
    'approve-transaction',
    approveParam,
  );

  const approveToSignUrl = approveURL.replace('https://www.okx.com', '');
  const timestamp = new Date().toISOString();
  const headers = getHeaders(timestamp, approveToSignUrl);
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
    dataObject: {
      to: tokenInAddress,
      amount: amount.toString(),
    },
    shouldSend: true,
  };
}

export async function getSwapData(
  userAddress: string,
  chainId: number,
  tokenInAddress: string,
  tokenOutAddress: string,
  amount: bigint,
): Promise<Tx> {
  const swapParams = {
    amount,
    chainId,
    toTokenAddress: tokenOutAddress,
    fromTokenAddress: tokenInAddress,
    slippage: '0.1',
    userWalletAddress: userAddress,
  };
  const swapURL = getAggregatorRequestUrl('swap', swapParams);

  const swapToSignUrl = swapURL.replace('https://www.okx.com', '');

  const timestamp = new Date().toISOString();
  const headers = getHeaders(timestamp, swapToSignUrl);
  const swapRes = await fetch(swapURL, {
    method: 'get',
    headers,
  });
  const resData = (await swapRes.json()).data[0];

  return {
    chainId,
    to: resData.to,
    value: '0',
    data: resData.data,
    dataObject: {
      fromTokenAddress: tokenInAddress,
      toTokenAddress: tokenOutAddress,
      amount: amount.toString(),
    },
    shouldSend: true,
  };
}

function getAccessSign(
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

function getHeaders(timestamp: string, toSignUrl: string): HeadersParams {
  return {
    'Content-Type': 'application/json',
    // The api Key obtained from the previous application
    'OK-ACCESS-KEY': ACCESS_KEY,
    'OK-ACCESS-SIGN': getAccessSign(timestamp, toSignUrl, SECREAT_KEY),
    // Convert the current time to the desired format
    'OK-ACCESS-TIMESTAMP': timestamp,
    // The password created when applying for the key
    'OK-ACCESS-PASSPHRASE': PASSPHRASE,
  };
}

function getAggregatorRequestUrl(methodName: string, queryParams: any) {
  return (
    apiBaseUrl + methodName + '?' + new URLSearchParams(queryParams).toString()
  );
}
