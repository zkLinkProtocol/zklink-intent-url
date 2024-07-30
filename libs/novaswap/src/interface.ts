import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  tokenInAddress: string;
  tokenOutAddress: string;
  recipient: string;
  deadlineDurationInSec: number;
  amountIn: bigint;
}

type ConversionMap<T> = {
  [K in keyof T]: (value: string) => T[K];
};

const conversionMap: ConversionMap<Params> = {
  tokenInAddress: (value) => value,
  tokenOutAddress: (value) => value,
  recipient: (value) => value,
  deadlineDurationInSec: (value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error(
        `Invalid deadlineDurationInSec value: "${value}" is not a valid number.`,
      );
    }
    return parsed;
  },
  amountIn: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(
        `Invalid amountIn value: "${value}" is not a valid bigint.`,
      );
    }
  },
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
