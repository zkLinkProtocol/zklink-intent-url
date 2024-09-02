import { ActionTransactionParams } from 'src/common/dto';

export interface Params {
  chainId: number;
  recipient: string;
  value: bigint;
  token: string;
}
export function intoParams(raw: ActionTransactionParams): Params {
  if (!raw.chainId) {
    throw new Error('missing field "chainId"');
  }
  if (!raw.value) {
    throw new Error('missing field "value"');
  }
  const value = BigInt(raw.value);
  if (value < BigInt(0)) {
    throw new Error(
      `Invalid value value: "${raw.value}" is not a valid bigint.`,
    );
  }
  if (!raw.token) {
    throw new Error('missing field "value"');
  }

  return {
    chainId: raw.chainId,
    recipient: raw.recipient,
    value: value,
    token: raw.token,
  };
}
