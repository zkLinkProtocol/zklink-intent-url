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
    amount: number;
    token: string;
    commissionRate: number;
  }): Promise<TransactionInfo> {
    const { code, chainId, amount, token, commissionRate } = params;
    const account = await this.dataService.getMagicLinkCreatorInfoByCode(code);
    if (!account) {
      throw new Error(`account not found on magicLink ${code}`);
    }
    const provider = this.chainService.getProvider(chainId);
    let transferTx = { to: account.address, data: '0x' };

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
        account.address,
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
      isCommission: true,
    };
  }
}
