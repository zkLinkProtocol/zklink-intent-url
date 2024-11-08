export type FieldTypes = {
  token: string;
  name: string;
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
