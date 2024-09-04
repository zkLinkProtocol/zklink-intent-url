import { Address } from 'src/types';

export enum DistributionModeValue {
  EqualAmountPerAddress = 'equalAmountPerAddress',
  RandomAmountPerAddress = 'randomAmountPerAddress',
}

export enum DistributionTokenValue {
  ETH = '0x000000000000000000000000000000000000800A',
  USDC = '0x1a1A3b2ff016332e866787B311fcB63928464509',
  USDT = '0x2F8A25ac62179B31D62D7F80884AE57464699059',
  DAI = '0xF573fA04A73d5AC442F3DEa8741317fEaA3cDeab',
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
  payForGas: bigint;
  totalShare: number;
  packetHash: string;
  isRandom: boolean;
  isGasfree: boolean;
  expiry: number;
}

export interface ClaimRedPacketParams {
  id: string;
  recipient: string;
  expiry: number;
}

export type FormName =
  | 'distributionMode'
  | 'totalDistributionAmount'
  | 'distributionToken'
  | 'amountOfRedEnvelopes'
  | 'gasToken';
