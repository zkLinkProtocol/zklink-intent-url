import { ConversionMap, rawIntoParams } from '@action/utils';
import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  recipient: string;
  value: bigint;
}

const conversionMap: ConversionMap<Params> = {
  recipient: (value) => value,
  value: (value) => {
    try {
      return BigInt(value);
    } catch (e) {
      throw new Error(`Invalid value value: "${value}" is not a valid bigint.`);
    }
  },
};

export function intoParams(raw: ActionTransactionParams): Params {
  return rawIntoParams(raw, conversionMap);
}
