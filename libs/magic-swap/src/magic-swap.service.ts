import { RegistryPlug } from '@action/registry';
import { ChainService, HelperService, OKXService } from '@core/shared';
import { getERC20SymbolAndDecimals } from '@core/utils';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { FieldTypes } from './types';
@RegistryPlug('magic-swap', 'v1')
@Injectable()
export class MagicSwapService extends ActionDto<FieldTypes> {
  constructor(
    private readonly okxService: OKXService,
    private readonly helperService: HelperService,
    private readonly chainService: ChainService,
  ) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Magic Swap',
      description:
        '<div>Perform news seamlessly across multiple networks</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.EthereumMainnet,
        Chains.ArbitrumOne,
        Chains.OpMainnet,
        Chains.Mantle,
        Chains.Base,
      ]),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {},
      intent: {
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
            type: 'input',
            regex: '^.*$',
            regexDesc: 'Invalid Address',
          },
          {
            name: 'tokenTo',
            label: 'Token To',
            desc: 'The address of the token you want to receive',
            type: 'input',
            regex: '^.*$',
            regexDesc: 'Invalid Address',
          },
        ],
      },
      maxCommission: 0.03,
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { code, chainId, account, commissionRate = 0.001 } = additionalData;

    if (!code) {
      throw Error('Missing code');
    }

    if (!commissionRate) {
      throw Error('Missing commissionRate');
    }

    if (!account) {
      throw new Error('Missing account!');
    }

    if (chainId === 51) {
      return [
        await this.okxService.getSwapData(
          '93AikG5NnncNRMFzHRRUYtmxDpkStwvZSwnmRLgn4Tmt',
          chainId,
          formData.tokenFrom,
          formData.tokenTo,
          BigInt(formData.amountToBuy),
        ),
      ];
    }

    const commissionTx = await this.helperService.parseCommissionTx({
      code,
      chainId,
      amount: Number(formData.amountToBuy),
      token:
        formData.tokenFrom === ethers.ZeroAddress ? '' : formData.tokenFrom,
      commissionRate,
    });

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
        String(Number(amountToBuy) - commissionRate * Number(amountToBuy)),
        decimals,
      ),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;

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
      return [commissionTx, swapTx];
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
      return [commissionTx, approveTx, swapTx];
    }
  }
}
