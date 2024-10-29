import { RegistryPlug } from '@action/registry';
import { ChainService, OKXService } from '@core/shared';
import { getERC20SymbolAndDecimals } from '@core/utils';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  ReporterResponse,
  TransactionInfo,
  UpdateFieldType,
} from 'src/common/dto';
import { Chains } from 'src/constants';
import { TgbotService } from 'src/modules/tgbot/tgbot.service';
import { Address, ErrorMessage } from 'src/types';

import { FieldTypes } from './types';

//magic news
@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FieldTypes> {
  private logger = new Logger(NewsService.name);
  constructor(
    private readonly tgbotService: TgbotService,
    private readonly okxService: OKXService,
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
  }
  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Magic News',
      description:
        '<div>Perform news seamlessly across multiple networks</div>',
      sharedContent: {
        en: 'I want to share My MagicNews Trading Journey with you! Trade your Magic News directly from here!',
        zh: '我想与您分享我的MagicNews交易之旅！您可以直接从这里交易您的Magic News！',
      },
      networks: this.chainService.buildSupportedNetworks([
        Chains.EthereumMainnet,
        Chains.ArbitrumOne,
        Chains.OpMainnet,
        Chains.Linea,
        Chains.Base,
        Chains.MantaPacificMainnet,
      ]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {},
      whiteList: this.configService
        .get<string>('NEWS_WHITE_ADDRESS')
        ?.split(',')
        .map((address) => address.toLowerCase()),
      intent: {
        binding: 'amountToBuy',
        components: [
          {
            name: 'amountToBuy',
            label: 'Amount to Buy',
            desc: 'The amount of input tokens used to buy output tokens',
            type: 'input',
            regex: '^[0-9]+(.[0-9]+)?$',
            regexDesc: 'Positive number',
          },
          {
            name: 'tokenFrom',
            label: 'Token From ',
            desc: 'The token you want to swap',
            type: 'inputSelect',
            options: [
              {
                label: 'WBTC',
                value: 'wbtc',
              },
              {
                label: 'USDT',
                value: 'usdt',
              },
              {
                label: 'USDC',
                value: 'usdc',
              },
              {
                label: 'WETH',
                value: 'WETH',
              },
              {
                label: 'ETH',
                value: 'ETH',
              },
            ],
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid Address',
          },
          {
            name: 'tokenTo',
            label: 'Token To',
            desc: 'The address of the token you want to receive',
            type: 'inputSelect',
            options: [
              {
                label: 'WBTC',
                value: 'wbtc',
              },
              {
                label: 'USDT',
                value: 'usdt',
              },
              {
                label: 'USDC',
                value: 'usdc',
              },
              {
                label: 'WETH',
                value: 'WETH',
              },
              {
                label: 'ETH',
                value: 'ETH',
              },
            ],
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid Address',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    const { chainId, account } = additionalData;
    if (!account) {
      throw new Error('Missing account!');
    }
    const { amountToBuy, ...restParams } = formData;
    const provider = this.chainService.getProvider(chainId);

    let tokenFromDecimal;
    if (
      formData.tokenFrom.toLocaleLowerCase() ===
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      tokenFromDecimal = 18;
    } else {
      const tokenFromContract = await new Contract(
        formData.tokenFrom,
        ['function decimals() view returns (uint8)'],
        provider,
      );
      tokenFromDecimal = await tokenFromContract.decimals();
    }

    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(amountToBuy, tokenFromDecimal),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo & {
      tokens: Array<{
        tokenAddress: string;
        amount: string;
        direction?: 'from' | 'to';
      }>;
    };
    const tokenInAddress = formData.tokenFrom.toLowerCase() as Address;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (
      tokenInAddress.toLocaleLowerCase() ===
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return { displayInfo: { tokens: swapTx.tokens }, transactions: [swapTx] };
    } else {
      //buy
      approveTx = await this.okxService.getApproveData(
        chainId,
        tokenInAddress,
        ethers.MaxUint256,
      );

      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return {
        displayInfo: { tokens: swapTx.tokens },
        transactions: [approveTx, swapTx],
      };
    }
  }

  async validateFormData(
    formData: UpdateFieldType<FieldTypes, 'amountToBuy'>,
  ): Promise<ErrorMessage> {
    const chainId = formData.chainId;
    if (!chainId) {
      return 'Missing chainId';
    }
    for (const amount of formData.amountToBuy) {
      if (!this.isNumeric(amount)) return 'Amount must be a number';

      const checkParasm: GenerateTransactionParams<FieldTypes> = {
        additionalData: {
          chainId,
          // just for pre-check swap conditions,it can be any address
          account: '0xA510dbc9aC79a686EBB78cDaE791d91F3f45b3a9',
        },
        formData: {
          amountToBuy: amount,
          tokenFrom: formData.tokenFrom,
          tokenTo: formData.tokenTo,
        },
      };
      try {
        await this.generateTransaction(checkParasm);
      } catch (err) {
        return err.toString();
      }
    }
    return '';
  }

  async preCheckTransaction(
    params: GenerateTransactionParams<FieldTypes>,
  ): Promise<ErrorMessage> {
    if (!this.isNumeric(params.formData.amountToBuy))
      return 'Amount must be a number';
    return '';
  }

  isNumeric(value: string): boolean {
    const num = Number(value);
    return !isNaN(num);
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    await this.tgbotService.sendNews(data.additionalData.code!);
    return [];
  }

  public async reportTransaction(
    data: GenerateTransactionParams<FieldTypes>,
    _txHashes: Array<{ hash: string; chainId: number }>,
  ): Promise<ReporterResponse> {
    const { formData, additionalData } = data;
    const { chainId } = additionalData;
    let tokenFromDecimal: bigint;
    let tokenSymbol: string;
    const provider = this.chainService.getProvider(chainId);
    if (
      formData.tokenFrom.toLocaleLowerCase() ===
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      tokenFromDecimal = 18n;
      tokenSymbol = 'ETH';
    } else {
      const { symbol, decimals } = await getERC20SymbolAndDecimals(
        provider,
        formData.tokenFrom,
      );
      tokenFromDecimal = decimals;
      tokenSymbol = symbol;
    }
    const amount = ethers.formatUnits(formData.amountToBuy, tokenFromDecimal);
    return {
      tip: `Buy ${amount} worthed ${tokenSymbol} successfully`,
      sharedContent: {
        en: `I want to share My MagicNews Trading Journey with you!---I buy ${amount} worthed ${tokenSymbol}. Trade your Magic News directly from here!`,
        zh: `我想与您分享我的magicLinks交易之旅!---我购买了${amount}个${tokenSymbol}. 您可以直接从这里交互您的magicLinks！`,
      },
    };
  }
}
