import { ethers } from 'ethers';

import {
  DIAMOND_ADDRESS,
  HEDGER_URL,
  LIMIT_ORDER_DEADLINE,
  MARKET_ORDER_DEADLINE,
  MARKET_PRICE_COEFFICIENT,
  MUON_API,
  PARTY_B_WHITELIST,
} from '../constant';
import { OrderType, PositionType } from '../types';
import { toBN, toWei } from './number';

export const getRequestParams = (
  account: string,
  chainId: number,
  contractAddress: string,
  marketId: number,
) => {
  return [
    ['partyA', account],
    ['chainId', chainId.toString()],
    ['symmio', contractAddress],
    ['symbolId', marketId.toString()],
  ];
};

export const getMuonSign = async (
  account: string,
  chainId: number,
  marketId: number,
) => {
  const muonURL = new URL(MUON_API);
  muonURL.searchParams.set('app', 'symmio');
  muonURL.searchParams.append('method', 'uPnl_A_withSymbolPrice');
  const requestParams = getRequestParams(
    account,
    chainId,
    DIAMOND_ADDRESS,
    marketId,
  );
  requestParams.forEach((param) => {
    muonURL.searchParams.append(`params[${param[0]}]`, param[1]);
  });
  const response = await fetch(`${muonURL.href}`, {
    method: 'get',
    headers: [['Cache-Control', 'no-cache']],
  });
  const result = await response.json();

  const reqId = result.result.reqId;
  const timestamp = result.result.data.timestamp
    ? BigInt(result.result.data.timestamp)
    : BigInt(0);
  console.log('timestamp: ', timestamp);
  const upnl = result.result.data.result.uPnl
    ? BigInt(result.result.data.result.uPnl)
    : BigInt(0);
  const price = result.result.data.result.price
    ? BigInt(result.result.data.result.price)
    : BigInt(0);
  const gatewaySignature = result.result.nodeSignature;
  const signature = result.result.signatures[0].signature
    ? BigInt(result.result.signatures[0].signature)
    : BigInt(0);
  const owner = result.result.signatures[0].owner;
  const nonce = result.result.data.init.nonceAddress;

  const generatedSignature = {
    reqId,
    timestamp,
    upnl,
    price: price ? price : toWei(0),
    gatewaySignature,
    sigs: { signature, owner, nonce },
  };

  return generatedSignature;
};

export const fetchMarketSymbolId = async (marketId: number) => {
  const marketsUrl = new URL('contract-symbols', HEDGER_URL).href;

  try {
    const response = await fetch(marketsUrl, { method: 'get' });
    const marketsData = await response.json();
    const filteredMarkets = marketsData.data.symbols
      .filter((market: any) => market.symbol_id === marketId)
      .map((market: any) => ({
        id: market.symbol_id,
        name: market.name,
        symbol: market.symbol,
        asset: market.asset,
        pricePrecision: market.price_precision,
        quantityPrecision: market.quantity_precision,
        isValid: market.is_valid,
        minAcceptableQuoteValue: market.min_acceptable_quote_value,
        minAcceptablePortionLF: market.min_acceptable_portion_lf,
        tradingFee: market.trading_fee,
        maxLeverage: market.max_leverage,
        maxNotionalValue: market.max_notional_value,
        maxFundingRate: market.max_funding_rate,
        rfqAllowed: market.rfq_allowed,
        hedgerFeeOpen: market.hedger_fee_open,
        hedgerFeeClose: market.hedger_fee_close,
        autoSlippage:
          60 / market.max_leverage / 100 + 1 || MARKET_PRICE_COEFFICIENT,
      }));
    return filteredMarkets;
  } catch (error) {
    console.error('Error fetching market symbols:', error);
  }
};

export const fetchLockedParams = async (pair: string, leverage: number) => {
  const url = `${HEDGER_URL}get_locked_params/${pair}?leverage=${leverage}`;

  const response = await fetch(url, { method: 'get' });
  const lockData = await response.json();
  const data = lockData.data;

  const output = {
    cva: data.cva,
    partyAmm: data.partyAmm,
    lf: data.lf,
    leverage: data.leverage,
    partyBmm: data.partyBmm,
  };

  return output;
};

export const getPrice = async (
  marketId: number,
  subAccount: string,
  chainId: number,
  slippage: 'auto' | number,
  positionType: PositionType,
  orderType: OrderType,
  typedPriceBNStr: string,
): Promise<bigint> => {
  const { markets } = await fetchMarketSymbolId(marketId);
  const autoSlippage = markets[0].autoSlippage;

  const signatureResult = await getMuonSign(subAccount, chainId, marketId);
  let adjustedPrice =
    orderType === OrderType.MARKET
      ? BigInt(signatureResult.price)
      : BigInt(typedPriceBNStr);
  let numericSlippage;

  if (slippage === 'auto') {
    const autoSlippageNumerator = BigInt(Math.floor(autoSlippage * 1000));
    const autoSlippageDenominator = BigInt(1000);
    adjustedPrice =
      positionType === PositionType.SHORT
        ? (adjustedPrice * autoSlippageDenominator) / autoSlippageNumerator
        : (adjustedPrice * autoSlippageNumerator) / autoSlippageDenominator;
  } else {
    numericSlippage = Number(slippage);
    if (isNaN(numericSlippage)) {
      throw new Error("Slippage must be a number or 'auto'");
    }
    const spSigned =
      positionType === PositionType.SHORT ? numericSlippage : -numericSlippage;
    const slippageFactored = (100 - spSigned) / 100;
    const slippageFactorBigInt = BigInt(Math.floor(slippageFactored * 100));
    adjustedPrice = (adjustedPrice * slippageFactorBigInt) / BigInt(100);
  }

  return adjustedPrice;
};

export const getDeadline = (orderType: OrderType) => {
  const deadline =
    orderType === OrderType.MARKET
      ? Math.floor(Date.now() / 1000) + MARKET_ORDER_DEADLINE
      : Math.floor(Date.now() / 1000) + LIMIT_ORDER_DEADLINE;

  return deadline;
};

export const executeSendQuoteMarket = async (
  chainId: number,
  marketId: number,
  subAccount: string,
  positionType: PositionType,
  orderType: OrderType, //OrderType.Market
  quantity: string,
  slippage: 'auto' | number,
  leverage: number,
) => {
  const { markets } = await fetchMarketSymbolId(marketId);
  const lockedParams = await fetchLockedParams(markets[0].name, leverage);
  const signatureResult = await getMuonSign(subAccount, chainId, marketId);
  const requestedPrice = await getPrice(
    marketId,
    subAccount,
    chainId,
    slippage,
    positionType,
    orderType,
    '0', // only supported marked order
  );

  const { reqId, timestamp, upnl, price, gatewaySignature, sigs } =
    signatureResult;
  console.log('Price of asset: ', price);
  if (typeof reqId === 'undefined' || !reqId.startsWith('0x')) {
    console.error('reqId is undefined or not a hex string:', reqId);
  }
  if (
    typeof gatewaySignature === 'undefined' ||
    !gatewaySignature.startsWith('0x')
  ) {
    console.error(
      'gatewaySignature is undefined or not a hex string:',
      gatewaySignature,
    );
  }
  const upnlSigFormatted = {
    reqId: ethers.getBytes(reqId),
    timestamp: timestamp.toString(),
    upnl: upnl.toString(),
    price: price.toString(),
    gatewaySignature: ethers.getBytes(gatewaySignature),
    sigs: {
      signature: sigs.signature.toString(),
      owner: sigs.owner,
      nonce: sigs.nonce,
    },
  };
  const partyBsWhiteList = [PARTY_B_WHITELIST];
  const symbolId = markets[0].id;

  // Getting the Notional Value of the Quote:
  const requestedQuantityWei = ethers
    .parseUnits(quantity.toString(), 18)
    .toString();
  console.log('requestedQuantityWei:', requestedQuantityWei);
  const adjustedPriceStr = requestedPrice.toString();
  const notionalValue = toBN(requestedQuantityWei).multipliedBy(
    toBN(adjustedPriceStr),
  );
  console.log('notionalValue:', notionalValue.toString());

  // Getting the CVA (Credit Value Adjustment):
  const cvaWei = notionalValue
    .multipliedBy(toBN(lockedParams.cva * 100))
    .div(10000)
    .div(lockedParams.leverage)
    .div(1e18);

  // Getting the LF (Liquidator Fee):
  const lfWei = notionalValue
    .multipliedBy(lockedParams.lf * 100)
    .div(1000)
    .div(lockedParams.leverage)
    .div(1e18);

  // Getting the Maintenance Margin (Also required for partyB)
  const partyAmmWei = notionalValue
    .multipliedBy(lockedParams.partyAmm * 100)
    .div(10000)
    .div(lockedParams.leverage)
    .div(1e18);

  const partyBmmWei = notionalValue
    .multipliedBy(lockedParams.partyBmm * 100)
    .div(10000)
    .div(1e18);

  // Finally, set the maxFundingRate and deadline:
  const maxFundingRate = markets[0].maxFundingRate;
  const deadline = getDeadline(orderType);
  const sendQuoteParameters = [
    partyBsWhiteList,
    symbolId,
    positionType,
    orderType,
    requestedPrice.toString(),
    requestedQuantityWei.toString(),
    cvaWei.toString(),
    lfWei.toString(),
    partyAmmWei.toString(),
    partyBmmWei.toString(),
    maxFundingRate.toString(),
    deadline.toString(),
    upnlSigFormatted,
  ] as const;

  return sendQuoteParameters;
};
