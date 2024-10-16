import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ethers from 'ethers';

import { TransactionInfo } from 'src/common/dto';
import { ConfigType } from 'src/config';

import { DataService } from './data.service';
import ERC20ABI from '../abis/ERC20.json';

@Injectable()
export class HelperService {
  private readonly rpcs: ConfigType['rpc'];
  constructor(
    private readonly dataService: DataService,
    readonly configService: ConfigService,
  ) {
    this.rpcs = configService.get('rpc', { infer: true })!;
  }

  public async parseCommissionTx(params: {
    code: string;
    chainId: number;
    amount: number;
    token: string;
    commission: number;
  }): Promise<TransactionInfo> {
    const { code, chainId, amount, token, commission } = params;
    const account = await this.dataService.getMagicLinkCreatorInfoByCode(code);
    if (!account) {
      throw new Error(`account not found on magic link ${code}`);
    }

    const providerUrl = this.rpcs[chainId as keyof ConfigType['rpc']];
    const provider = new ethers.JsonRpcProvider(providerUrl);
    let transferTx = { to: account.address, data: '0x' };

    if (token !== '') {
      const contract = new ethers.Contract(
        token.toString(),
        ERC20ABI,
        provider,
      );
      const decimals = await contract.decimals();
      const amountToSend = ethers.parseUnits(
        (amount * commission).toString(),
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
          ? ethers.parseUnits(amount.toString(), 18).toString()
          : '0',
      data: transferTx.data,
      shouldPublishToChain: true,
      isCommission: true,
    };
  }
}
