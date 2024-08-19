import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  tokenIn: string;
  tokenOutAddress: string;

  chainId: number;
  amountToBuy?: bigint;
  amountToSell?: bigint;
  percentToSell?: bigint;
}

type ConversionMap<T> = {
  [K in keyof T]: (value: string) => T[K];
};

const conversionMap: ConversionMap<Params> = {
  chainId: (value) => parseInt(value, 10),
  tokenIn: (value) => value,
  tokenOutAddress: (value) => value,
  amountToBuy: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(
        `Invalid amountToBuy value: "${value}" is not a valid bigint.`,
      );
    }
  },
  amountToSell: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(
        `Invalid amountToSell value: "${value}" is not a valid bigint.`,
      );
    }
  },
  percentToSell: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(
        `Invalid percentToSell value: "${value}" is not a valid bigint.`,
      );
    }
  },
};

export function intoParams(raw: ActionTransactionParams): Params {
  const result: Partial<Params> = {};
  // Ensure at least one of amountToBuy, amountToSell, or percentToSell is provided
  if (
    raw.amountToBuy === undefined &&
    raw.amountToSell === undefined &&
    raw.percentToSell === undefined
  ) {
    throw new Error(
      'At least one of amountToBuy, amountToSell, or percentToSell must be provided',
    );
  }

  for (const key in conversionMap) {
    const convert = conversionMap[key as keyof ConversionMap<Params>]!;
    if (raw[key] !== undefined) {
      result[key as keyof Params] = convert(
        raw[key as keyof ActionTransactionParams],
      ) as any;
    } else if (
      key !== 'amountToBuy' &&
      key !== 'amountToSell' &&
      key !== 'percentToSell'
    ) {
      throw new Error(`Missing required parameter: ${key}`);
    }
  }

  return result as Params;
}
