import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  recipient: string;
  value: bigint;
}
export function intoParams(raw: ActionTransactionParams): Params {
  if (!raw.value) {
    throw new Error('missing field "value"');
  }
  const value = BigInt(raw.value);
  if (value < BigInt(0)) {
    throw new Error(
      `Invalid value value: "${raw.value}" is not a valid bigint.`,
    );
  }

  return {
    recipient: raw.recipient,
    value: value,
  };
}
