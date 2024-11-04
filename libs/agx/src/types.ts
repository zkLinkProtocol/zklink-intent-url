export type FieldTypes = {
  amount: string;
  slippage: 'auto' | number;
  marketId: number;
  positionType: PositionType;
  orderType: OrderType;
  quantity: string;
  leverage: number;
  accountName: string;
  txType: 'addAccount' | 'sendQuote';
};

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};

export enum PositionType {
  LONG,
  SHORT,
}

export enum OrderType {
  MARKET,
  LIMIT,
}

export type Account = {
  accountAddress: string;
  name: string;
  owner: string;
};
