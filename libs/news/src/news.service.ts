import { RegistryPlug } from '@action/registry';
import { ChainService, OKXService } from '@core/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateFormParams,
  GenerateTransactionParams,
  TransactionInfo,
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
  ) {
    super();
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
        Chains.ZkSync,
        Chains.Mantle,
        Chains.Linea,
        Chains.Base,
        Chains.ScrollMainnet,
        Chains.MantaPacificMainnet,
      ]),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {},
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
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { chainId, account } = additionalData;
    if (!account) {
      throw new Error('Missing account!');
    }
    const { amountToBuy, ...restParams } = formData;
    const supportTokens = await this.okxService.getAllTokens(chainId);
    const tokenFrom = supportTokens
      .filter(
        (token) =>
          token.tokenContractAddress.toLowerCase() ===
          formData.tokenFrom.toLowerCase(),
      )
      .map((token) => ({
        address: token.tokenContractAddress.toLowerCase() as Address,
        decimal: Number(token.decimals),
      }))[0];

    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(amountToBuy, tokenFrom.decimal),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;
    const tokenInAddress = tokenFrom.address;

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (tokenInAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      swapTx.requiredTokenAmount = tokens;
      return [swapTx];
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
      return [approveTx, swapTx];
    }
  }

  async validateFormData(
    formData: GenerateFormParams<FieldTypes>,
  ): Promise<ErrorMessage> {
    if (!this.isNumeric(formData.amountToBuy)) return 'Amount must be a number';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    let chainId = formData.chainId;
    if (!chainId) {
      return 'Missing chainId';
    }
    chainId = Number(chainId);

    const checkParasm: GenerateTransactionParams<FieldTypes> = {
      additionalData: {
        chainId,
        // just for pre-check swap conditions,it can be any address
        account: '0xA510dbc9aC79a686EBB78cDaE791d91F3f45b3a9',
      },
      formData,
    };
    try {
      await this.generateTransaction(checkParasm);
    } catch (err) {
      return err.toString();
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
}
