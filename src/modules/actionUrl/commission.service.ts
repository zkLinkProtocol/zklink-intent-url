import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { ChainService } from '@core/shared';
import { Action } from 'src/entities/action.entity';
import { Intention } from 'src/entities/intention.entity';
import { CommissionRepository } from 'src/repositories';

@Injectable()
export class CommissionService {
  constructor(
    private readonly commissionRepository: CommissionRepository,
    private readonly chainService: ChainService,
  ) {}
  async handleCommissionTransaction(
    action: Action,
    intention: Intention,
    chainId: number,
    txHash: string,
  ) {
    try {
      // Get the transaction details
      const provider = this.chainService.getProvider(chainId);
      // Get the transaction details
      const tx = await provider.getTransaction(txHash);
      if (!tx) {
        throw new Error('Transaction not found');
      }

      // Parse transaction information
      const fromAddress = tx.from;
      const toAddress = tx.to!;
      const data = tx.data;
      const value = BigInt(tx.value); // ETH value sent

      let tokenAddress: string, tokenAmount: bigint;

      // Check if the data is empty (0x)
      if (data === '0x') {
        console.log('Transaction is an ETH transfer.');
        tokenAddress = '0x'; // No token address for ETH transfer
        tokenAmount = value; // Use the value as the token amount
      } else {
        // Assuming the first 20 bytes (40 hex characters) are the token address
        tokenAddress = ethers.getAddress(data.slice(0, 66)); // Parses to address
        // Assuming the remainder of the data is the token amount in hex
        tokenAmount = BigInt(data.slice(66)); // Parses to BigNumber
      }

      // Store the commission data
      await this.commissionRepository.add({
        fromAddress,
        toAddress,
        tokenAddress,
        tokenAmount: tokenAmount,
        action,
        intention,
        txHash,
      });
    } catch (error) {
      console.error('Error handling commission transaction:', error);
    }
  }
}
