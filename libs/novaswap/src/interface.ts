import { ConversionMap, rawIntoParams as rawIntoParams } from '@action/utils';
import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  tokenInAddress: string;
  tokenOutAddress: string;
  recipient: string;
  deadlineDurationInSec: number;
  amountIn: bigint;
  amountInDecimal: number;
}

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
  amountInDecimal: (value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error(
        `Invalid amountInDecimal value: "${value}" is not a valid number.`,
      );
    }
    return parsed;
  },
};

export function intoParams(raw: ActionTransactionParams): Params {
  return rawIntoParams(raw, conversionMap);
}
