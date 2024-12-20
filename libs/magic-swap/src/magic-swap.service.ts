import { RegistryPlug } from '@action/registry';
import {
  ChainService,
  DataService,
  HelperService,
  OKXService,
} from '@core/shared';
import { getERC20SymbolAndDecimals } from '@core/utils';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
  UpdateFieldType,
} from 'src/common/dto';
import { Chains } from 'src/constants';
import { ErrorMessage } from 'src/types';

import { FieldTypes } from './types';
@RegistryPlug('magic-swap', 'v1')
@Injectable()
export class MagicSwapService extends ActionDto<FieldTypes> {
  constructor(
    private readonly okxService: OKXService,
    private readonly helperService: HelperService,
    private readonly chainService: ChainService,
    private readonly dataService: DataService,
  ) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Swap via OKX swap',
      description:
        '<div>Perform news seamlessly across multiple networks</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.EthereumMainnet,
        Chains.ArbitrumOne,
        Chains.OpMainnet,
        Chains.Linea,
        Chains.Base,
        Chains.BSCMainnet,
        Chains.MantaPacificMainnet,
      ]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
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
      maxCommission: 0.03,
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    const {
      code,
      chainId,
      account,
      commissionRate = 0.001,
      referrer,
    } = additionalData;

    if (!code) {
      throw Error('Missing code');
    }

    if (isNaN(commissionRate)) {
      throw Error('Missing commissionRate');
    }

    if (!account) {
      throw new Error('Missing account!');
    }
    // commission to creator of code
    const creator = await this.dataService.getMagicLinkCreatorInfoByCode(code);
    if (!creator) {
      throw new Error(`account not found on magicLink ${code}`);
    }
    const commissionToCreatorTx = await this.helperService.parseCommissionTx({
      code,
      chainId,
      to: creator.address,
      amount: Number(formData.amountToBuy),
      token:
        formData.tokenFrom === ethers.ZeroAddress ? '' : formData.tokenFrom,
      commissionRate,
    });

    let commissionToReferrerTx;
    if (referrer) {
      commissionToReferrerTx = await this.helperService.parseCommissionTx({
        code,
        chainId,
        to: referrer,
        amount: Number(formData.amountToBuy),
        token:
          formData.tokenFrom === ethers.ZeroAddress ? '' : formData.tokenFrom,
        commissionRate: 0.005,
      });
    }

    const provider = this.chainService.getProvider(chainId);

    const { amountToBuy, ...restParams } = formData;
    let tokenInAddress = formData.tokenFrom;
    let decimals;

    if (formData.tokenFrom === ethers.ZeroAddress) {
      tokenInAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      decimals = 18;
    } else {
      decimals = (await getERC20SymbolAndDecimals(provider, tokenInAddress))
        .decimals;
    }

    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(
        (Number(amountToBuy) - commissionRate * Number(amountToBuy)).toFixed(
          Number(decimals),
        ),
        decimals,
      ),
      tokenTo:
        formData.tokenTo.toLowerCase() === ethers.ZeroAddress
          ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          : formData.tokenTo,
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo & {
      tokens: Array<{
        tokenAddress: string;
        amount: string;
        direction?: 'from' | 'to';
      }>;
    };

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress as `0x${string}`,
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

      const transactions = [commissionToCreatorTx, swapTx].filter((i) => !!i);
      if (commissionToReferrerTx) {
        transactions.unshift(commissionToReferrerTx);
      }
      return {
        displayInfo: {
          tokens: swapTx.tokens.map((t) => {
            if (t.direction === 'from') {
              return { ...t, amount: formData.amountToBuy };
            } else {
              return { ...t };
            }
          }),
        },
        transactions,
      };
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
      const transactions = [commissionToCreatorTx, approveTx, swapTx].filter(
        (i) => !!i,
      );
      if (commissionToReferrerTx) {
        transactions.unshift(commissionToReferrerTx);
      }
      return {
        displayInfo: {
          tokens: swapTx.tokens.map((t) => {
            if (t.direction === 'from') {
              return { ...t, amount: formData.amountToBuy };
            } else {
              return { ...t };
            }
          }),
        },
        transactions,
      };
    }
  }

  async validateFormData(
    formData: UpdateFieldType<FieldTypes, 'amountToBuy'>,
  ): Promise<ErrorMessage> {
    for (const amountToBuy of formData.amountToBuy) {
      if (!this.isNumeric(amountToBuy)) return 'Amount must be a number';
    }
    const chainId = formData.chainId;
    const mockAccount = '0xA510dbc9aC79a686EBB78cDaE791d91F3f45b3a9';

    let decimals;
    let tokenInAddress = formData.tokenFrom;

    const provider = this.chainService.getProvider(chainId);
    if (formData.tokenFrom === ethers.ZeroAddress) {
      tokenInAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      decimals = 18;
    } else {
      decimals = (await getERC20SymbolAndDecimals(provider, tokenInAddress))
        .decimals;
    }

    formData.tokenTo =
      formData.tokenTo.toLowerCase() === ethers.ZeroAddress
        ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        : formData.tokenTo;

    try {
      for (const amountToBuy of formData.amountToBuy) {
        await this.okxService.getSwapData(
          mockAccount,
          chainId,
          tokenInAddress,
          formData.tokenTo,
          ethers.parseUnits(
            Number(amountToBuy).toFixed(Number(decimals)),
            decimals,
          ),
        );
      }
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
}
