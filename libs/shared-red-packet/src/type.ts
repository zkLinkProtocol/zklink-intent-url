import { Address } from 'src/types';

export enum DistributionModeValue {
  EqualAmountPerAddress = 'equalAmountPerAddress',
  RandomAmountPerAddress = 'randomAmountPerAddress',
}

export enum GasTokenValue {
  Eth = 'eth',
  DistributedToken = 'distributedToken',
}

export interface CreateRedPacketParams {
  creator: Address;
  token: Address;
  totalCount: number;
  tokenAmount: bigint;
  // payForGas: bigint;
  totalShare: number;
  packetHash: string;
  isRandom: boolean;
  // isGasfree: boolean;
  isInvitable: boolean;
  expiry: number;
}

export interface ClaimRedPacketParams {
  id: bigint;
  recipient: string;
  expiry: number;
  inviter?: string;
}

export type FieldTypes = {
  distributionMode: string;
  totalDistributionAmount: string;
  distributionToken: string;
  amountOfRedEnvelopes: string;
  gasToken: string;
  isInvitable: boolean;
};
