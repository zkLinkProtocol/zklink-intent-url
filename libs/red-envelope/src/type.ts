import { Address } from 'src/types';

export enum DistributionModeValue {
  EqualAmountPerAddress = 'equalAmountPerAddress',
  RandomAmountPerAddress = 'randomAmountPerAddress',
}

export enum DistributionTokenValue {
  ETH = '0x0000000000000000000000000000000000000000',
  DTN = '0x8a183994392CDBb3e6451cFC8cC779f7b0e907BA',
  USDC = '0x1a1A3b2ff016332e866787B311fcB63928464509',
  USDT = '0x2F8A25ac62179B31D62D7F80884AE57464699059',
  ZKL = '0xC967dabf591B1f4B86CFc74996EAD065867aF19E',
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
  password: string;
}

export interface ClaimRedPacketParams {
  id: bigint;
  recipient: string;
  password: string;
  expiry: number;
}

export type FieldTypes = {
  distributionMode: string;
  totalDistributionAmount: string;
  distributionToken: string;
  amountOfRedEnvelopes: string;
  gasToken: string;
  password: string;
};
