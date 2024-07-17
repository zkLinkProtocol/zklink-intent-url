export interface Params {
  tokenInAddress: string;
  tokenOutAddress: string;
  fee: number; // fee level, 0.3% fee is 3000
  recipient: string;
  deadlineDurationInSec: number;
  amountIn: bigint;
}
