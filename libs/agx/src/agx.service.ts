import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { Contract, Provider } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import DiamondABI from './abis/Diamond';
import ERC20 from './abis/ERC20';
import MultiAccountABI from './abis/MultiAccount';
import {
  COLLATERAL_ADDRESS,
  DIAMOND_ADDRESS,
  MULTI_ACCOUNT_ADDRESS,
} from './constant';
import { Account, FieldTypes, OrderType, PositionType } from './types';
import { executeSendQuoteMarket } from './utils';

@Injectable()
@RegistryPlug('agx', 'v1')
export class AgxService extends ActionDto<FieldTypes> {
  private readonly multiAccountContract: Contract;
  private readonly collateralContract: Contract;
  private readonly diamondContract: Contract;
  private readonly provider: Provider;
  private readonly chainId: Chains;
  constructor(private readonly chainService: ChainService) {
    super();
    this.chainId = Chains.Base;
    this.provider = this.chainService.getProvider(Chains.Base);
    this.diamondContract = new Contract(
      DIAMOND_ADDRESS,
      DiamondABI,
      this.provider,
    );
    this.multiAccountContract = new Contract(
      MULTI_ACCOUNT_ADDRESS,
      MultiAccountABI,
      this.provider,
    );
    this.collateralContract = new Contract(
      COLLATERAL_ADDRESS,
      ERC20,
      this.provider,
    );
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'AGX - One-Click Perpetual Trading',
      description:
        '<div>This action allows you to create a magicLink to receive donations</div>',
      networks: this.chainService.buildSupportedNetworks([Chains.Base]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        title: 'AGX - One-Click Perpetual Trading',
        description: 'AGX - One-Click Perpetual Trading',
      },
      intent: {
        components: [],
      },
    };
  }

  private addAccount(accountName: string): TransactionInfo {
    const calldata = this.multiAccountContract.interface.encodeFunctionData(
      'addAccount',
      [accountName],
    );
    return {
      chainId: this.chainId,
      data: calldata,
      value: '0',
      to: MULTI_ACCOUNT_ADDRESS,
    };
  }

  private async getFirstSubAccount(account: string): Promise<Promise<Account>> {
    const accountsLength =
      await this.multiAccountContract.getAccountsLength(account);
    const accounts = await this.multiAccountContract.getAccounts(
      account,
      0,
      accountsLength,
    );
    return accounts[0];
  }

  private depositAndAllocateForAccount(
    subAccount: string,
    amount: string,
  ): Array<TransactionInfo> {
    try {
      // Approving tokens

      const approveCalldata =
        this.collateralContract.interface.encodeFunctionData('approve', [
          MULTI_ACCOUNT_ADDRESS,
          amount,
        ]);

      // Depositing and Allocating
      const depositCalldata =
        this.multiAccountContract.interface.encodeFunctionData(
          'depositAndAllocateForAccount',
          [subAccount, amount],
        );
      return [
        {
          chainId: this.chainId,
          data: approveCalldata,
          value: '0',
          to: MULTI_ACCOUNT_ADDRESS,
        },
        {
          chainId: this.chainId,
          data: depositCalldata,
          value: '0',
          to: MULTI_ACCOUNT_ADDRESS,
        },
      ];
    } catch (error) {
      throw new Error(error);
    }
  }

  private async sendQuote(
    chainId: number,
    marketId: number,
    subAccount: string,
    positionType: PositionType,
    orderType: OrderType,
    quantity: string,
    slippage: 'auto' | number,
    leverage: number,
  ): Promise<TransactionInfo> {
    try {
      const signature = await executeSendQuoteMarket(
        chainId,
        marketId,
        subAccount,
        positionType,
        orderType, //OrderType.Market
        quantity,
        slippage,
        leverage,
      );

      const sendQuoteCalldata =
        this.diamondContract.interface.encodeFunctionData(
          'sendQuote',
          signature,
        );

      return {
        chainId: this.chainId,
        data: sendQuoteCalldata,
        value: '0',
        to: MULTI_ACCOUNT_ADDRESS,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    const { account, chainId } = additionalData;
    const {
      amount,
      slippage,
      marketId,
      positionType,
      orderType,
      quantity,
      leverage,
      accountName,
      txType,
    } = formData;

    if (txType === 'addAccount') {
      return { transactions: [this.addAccount(accountName)] };
    } else {
      if (!account) {
        throw new Error('No account connected');
      }
      const subAccount = await this.getFirstSubAccount(account);
      const depositTxs = await this.depositAndAllocateForAccount(
        subAccount.accountAddress,
        amount,
      );
      const sendQuoteTx = await this.sendQuote(
        chainId,
        marketId,
        subAccount.accountAddress,
        positionType,
        orderType,
        quantity,
        slippage,
        leverage,
      );
      return { transactions: [...depositTxs, sendQuoteTx] };
    }
  }
}
