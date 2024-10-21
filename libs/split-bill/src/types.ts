export type FieldTypes = { token: string; value: string; recipient: string };

export type TransactionResult = {
  toAddress: string;
  tokenAddress: string;
  value: string;
  txhash: string;
  chainId: number;
};
