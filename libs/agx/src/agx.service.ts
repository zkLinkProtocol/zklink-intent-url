import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  GoneException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  ReporterResponse,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { FieldTypes } from './types';

@RegistryPlug('agx', 'v1')
@Injectable()
export class AgxService extends ActionDto<FieldTypes> {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;
  constructor(private readonly chainService: ChainService) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      whiteList: ['0x78854850E7Afed5D0Bda68A56FAC24FF9347B7bD'],
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
        binding: true,
        components: [],
      },
    };
  }

  // private addAccount(accountName: string): TransactionInfo {
  //   const calldata = this.multiAccountContract.interface.encodeFunctionData(
  //     'addAccount',
  //     [accountName],
  //   );
  //   return {
  //     chainId: this.chainId,
  //     data: calldata,
  //     value: '0',
  //     to: MULTI_ACCOUNT_ADDRESS,
  //   };
  // }

  // private async getFirstSubAccount(account: string): Promise<Promise<Account>> {
  //   const accountsLength =
  //     await this.multiAccountContract.getAccountsLength(account);
  //   const accounts = await this.multiAccountContract.getAccounts(
  //     account,
  //     0,
  //     accountsLength,
  //   );
  //   return accounts[0];
  // }

  // private depositAndAllocateForAccount(
  //   subAccount: string,
  //   amount: string,
  // ): Array<TransactionInfo> {
  //   try {
  //     // Approving tokens

  //     const approveCalldata =
  //       this.collateralContract.interface.encodeFunctionData('approve', [
  //         MULTI_ACCOUNT_ADDRESS,
  //         amount,
  //       ]);

  //     // Depositing and Allocating
  //     const depositCalldata =
  //       this.multiAccountContract.interface.encodeFunctionData(
  //         'depositAndAllocateForAccount',
  //         [subAccount, amount],
  //       );
  //     return [
  //       {
  //         chainId: this.chainId,
  //         data: approveCalldata,
  //         value: '0',
  //         to: MULTI_ACCOUNT_ADDRESS,
  //       },
  //       {
  //         chainId: this.chainId,
  //         data: depositCalldata,
  //         value: '0',
  //         to: MULTI_ACCOUNT_ADDRESS,
  //       },
  //     ];
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // private async sendQuote(
  //   chainId: number,
  //   marketId: number,
  //   subAccount: string,
  //   positionType: PositionType,
  //   orderType: OrderType,
  //   quantity: string,
  //   slippage: 'auto' | number,
  //   leverage: number,
  // ): Promise<TransactionInfo> {
  //   try {
  //     const signature = await executeSendQuoteMarket(
  //       chainId,
  //       marketId,
  //       subAccount,
  //       positionType,
  //       orderType, //OrderType.Market
  //       quantity,
  //       slippage,
  //       leverage,
  //     );

  //     const sendQuoteCalldata =
  //       this.diamondContract.interface.encodeFunctionData(
  //         'sendQuote',
  //         signature,
  //       );

  //     return {
  //       chainId: this.chainId,
  //       data: sendQuoteCalldata,
  //       value: '0',
  //       to: MULTI_ACCOUNT_ADDRESS,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // private async requestToClosePosition(
  //   quoteId: number,
  //   marketId: number,
  //   subAccount: string,
  //   chainId: number,
  //   slippage: 'auto' | number,
  //   positionType: PositionType,
  //   orderType: OrderType,
  //   quantityToClose: string,
  // ): Promise<TransactionInfo> {
  //   try {
  //     const price = await getPrice(
  //       marketId,
  //       subAccount,
  //       chainId,
  //       slippage,
  //       positionType,
  //       orderType,
  //       '0',
  //     );
  //     const deadline = getDeadline(orderType);

  //     const closePositionCalldata =
  //       this.multiAccountContract.interface.encodeFunctionData(
  //         'requestToClosePosition',
  //         [
  //           BigInt(quoteId),
  //           price,
  //           BigInt(toWei(quantityToClose)),
  //           OrderType,
  //           BigInt(deadline),
  //         ],
  //       );
  //     return {
  //       chainId: this.chainId,
  //       data: closePositionCalldata,
  //       value: '0',
  //       to: DIAMOND_ADDRESS,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // private async deallocate(amount: number): Promise<TransactionInfo> {
  //   try {
  //     const signature = ''; // todo
  //     const deallocateCalldata =
  //       this.diamondContract.interface.encodeFunctionData('deallocate', [
  //         toWei(amount),
  //         signature,
  //       ]);

  //     return {
  //       chainId: this.chainId,
  //       data: deallocateCalldata,
  //       value: '0',
  //       to: DIAMOND_ADDRESS,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async reportTransaction(
    data: GenerateTransactionParams<FieldTypes>,
    _txHashes: Array<{ hash: string; chainId: number }>,
  ): Promise<ReporterResponse> {
    const { formData } = data;
    const { token } = formData;
    await this.cacheManager.set(`${token}:response`, _txHashes);
    return { tip: '' };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData } = data;
    const { callbackId } = additionalData;

    if (!callbackId) {
      throw new BadRequestException('missing callbackId');
    }

    const transactions = (await this.cacheManager.get(
      callbackId,
    )) as GenerateTransactionResponse | null;

    if (!transactions) {
      throw new GoneException('transactions not accessible');
    }

    return transactions;
  }
}
