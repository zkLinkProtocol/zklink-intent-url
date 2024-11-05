import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

import { TransactionInfo } from 'src/common/dto';

import { ChainService } from './chain.service';
import { DataService } from './data.service';
import ERC20ABI from '../abis/ERC20.json';

@Injectable()
export class HelperService {
  constructor(
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
  ) {}

  public async parseCommissionTx(params: {
    code: string;
    chainId: number;
    to: string;
    amount: number;
    token: string;
    commissionRate: number;
  }): Promise<TransactionInfo | null> {
    const { chainId, amount, token, commissionRate, to: toAddress } = params;
    if (commissionRate === 0) {
      return null;
    }

    const provider = this.chainService.getProvider(chainId);
    let transferTx = { to: toAddress, data: '0x' };

    if (token !== '') {
      const contract = new ethers.Contract(
        token.toString(),
        ERC20ABI,
        provider,
      );
      const decimals = await contract.decimals();
      const amountToSend = ethers.parseUnits(
        (amount * commissionRate).toFixed(Number(decimals)),
        decimals,
      );
      transferTx = await contract.transfer.populateTransaction(
        toAddress,
        amountToSend,
      );
    }

    return {
      chainId: chainId,
      to: transferTx.to,
      value:
        token === ''
          ? ethers
              .parseUnits((amount * commissionRate).toFixed(18), 18)
              .toString()
          : '0',
      data: transferTx.data,
      shouldPublishToChain: true,
      optional: true,
    };
  }
}
