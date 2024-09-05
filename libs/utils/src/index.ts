export { Multicall } from './multicall';
export { getERC20SymbolAndDecimals } from './token';

export type ConversionMap<T> = {
  [K in keyof T]: (value: string) => T[K];
};
