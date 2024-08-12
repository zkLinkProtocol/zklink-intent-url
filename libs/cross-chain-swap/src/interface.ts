import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  tokenInAddress: string;
  tokenOutAddress: string;
  amount: bigint;
  userAddress: string;
  chainId: number;
  isBuy: boolean;
  percentOrAmount: string;
}

type ConversionMap<T> = {
  [K in keyof T]: (value: string) => T[K];
};

const conversionMap: ConversionMap<Params> = {
  chainId: (value) => parseInt(value, 10),
  tokenInAddress: (value) => value,
  tokenOutAddress: (value) => value,
  userAddress: (value) => value,
  amount: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(
        `Invalid amountIn value: "${value}" is not a valid bigint.`,
      );
    }
  },
  isBuy: (value) => {
    if (typeof value === 'boolean') {
      return value;
    } else if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    } else {
      throw new Error(
        `Invalid isBuy value: "${value}" is not a valid boolean.`,
      );
    }
  },
  percentOrAmount: (value) => value,
};

export function intoParams(raw: ActionTransactionParams): Params {
  const result: Partial<Params> = {};

  for (const key in conversionMap) {
    const convert = conversionMap[key];

    if (raw[key] !== undefined) {
      result[key] = convert(raw[key]);
    } else {
      throw new Error(`Missing required parameter: ${key}`);
    }
  }

  return result as Params;
}
