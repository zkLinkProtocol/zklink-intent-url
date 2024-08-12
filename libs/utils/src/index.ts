export { Multicall } from './multicall';
export { getERC20SymbolAndDecimals } from './token';

export type ConversionMap<T> = {
  [K in keyof T]: (value: string) => T[K];
};

export function rawIntoParams<T>(
  raw: Record<string, string>,
  conversionMap: ConversionMap<T>,
): T {
  const result = {} as T;

  for (const key in conversionMap) {
    if (Object.prototype.hasOwnProperty.call(conversionMap, key)) {
      const convert = conversionMap[key];

      if (raw[key] !== undefined) {
        result[key] = convert(raw[key]);
      } else {
        throw new Error(`Missing required parameter: ${key}`);
      }
    }
  }

  return result;
}
