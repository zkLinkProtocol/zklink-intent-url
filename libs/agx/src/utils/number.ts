import BigNumber from 'bignumber.js';

export enum RoundMode {
  ROUND_UP,
  ROUND_DOWN,
}
export const BN_ZERO: BigNumber = toBN('0');
export const BN_TEN: BigNumber = toBN('10');

export function toBN(number: BigNumber.Value): BigNumber {
  return new BigNumber(number);
}

export function removeTrailingZeros(number: BigNumber.Value): string {
  return toBN(number).toString();
}

export function formatPrice(
  number: BigNumber.Value,
  pricePrecision = 2,
  separator = false,
  roundMode = RoundMode.ROUND_DOWN,
): string {
  const toFixed = toBN(number).toFixed(pricePrecision, roundMode);
  return separator ? toBN(toFixed).toFormat() : removeTrailingZeros(toFixed);
}

export function toWeiBN(
  amount: BigNumber.Value | null,
  decimals = 18,
): BigNumber {
  if (amount === undefined || amount === null || amount === '') return BN_ZERO;
  if (typeof amount === 'string' && isNaN(Number(amount))) {
    return BN_ZERO;
  }
  return toBN(amount).times(BN_TEN.pow(decimals));
}

export function toWei(
  amount: BigNumber.Value | null | bigint,
  decimals = 18,
): bigint {
  return BigInt(toWeiBN(amount?.toString() || '0', decimals).toFixed(0));
}
