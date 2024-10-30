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
import { ConfigType } from 'src/config';
import { Chains } from 'src/constants';
import { TgbotService } from 'src/modules/tgbot/tgbot.service';
import { Address, ErrorMessage } from 'src/types';

import { FieldTypes } from './types';

//magic news
@RegistryPlug('news', 'v1')
@Injectable()
export class NewsService extends ActionDto<FieldTypes> {
  private logger = new Logger(NewsService.name);
  private readonly chains: ConfigType['chains'];
  constructor(
    private readonly tgbotService: TgbotService,
    private readonly okxService: OKXService,
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.chains = this.configService.get('chains', { infer: true })!;
  }
  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Magic News',
      description:
        '<div>Perform news seamlessly across multiple networks</div>',
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

  private isNumeric(value: string): boolean {
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
    const chainInfo = this.chains.find((chain) => chain.chainId === chainId);
    return {
      tip: `Buy ${amount} worthed ${tokenSymbol} successfully`,
      sharedContent: {
        en: `Hey!😎 I’ve been trading with magicNews! it's an 🤖AI-Powered 7 ✖️ 24 Real-time Crypto News🗞 & One-click Flash Trading. I’ve just bought ${amount} worth of ${tokenSymbol} in {chain_name}, don't loss the chance to earn, 🎯trade smarter here!👇`,
        zh: `嘿！我一直在用新闻做交易！这是一个由人工智能驱动的实时加密新闻与一键交易平台。我刚刚在 ${chainInfo?.name} 中购买了价值 ${amount} 的 ${tokenSymbol}，不要错过赚取利润的机会，快来这里更聪明地交易吧！👇！`,
      },
    };
  }

  public async generateSharedContent(
    data: GenerateTransactionParams<FieldTypes>,
  ) {
    const { formData, additionalData } = data;
    const { chainId } = additionalData;
    let tokenSymbol: string;
    const provider = this.chainService.getProvider(chainId);
    if (
      formData.tokenFrom.toLocaleLowerCase() ===
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      tokenSymbol = 'ETH';
    } else {
      const { symbol } = await getERC20SymbolAndDecimals(
        provider,
        formData.tokenFrom,
      );
      tokenSymbol = symbol;
    }
    const chainInfo = this.chains.find((chain) => chain.chainId === chainId);
    return {
      en: `Based on real-time news 🗞, our AI 🤖 has automatically generated a one-click trading strategy 🎯—go long on ${tokenSymbol} on the ${chainInfo?.name} 🤩 Don’t miss this easy opportunity to make a profit! Come here to start a smarter trade! 📈👇`,
      zh: `基于实时新闻🗞，我们的AI🤖自动生成了一键完成的交易策略🎯—-在${chainInfo?.name}平台上 做多 ${tokenSymbol} 🤩别错过这个轻松赚取利润的时刻！快来这里，开启更聪明的交易体验吧！📈👇`,
    };
  }
}
