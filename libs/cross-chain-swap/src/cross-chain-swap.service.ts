import { RegistryPlug } from '@action/registry';
import { ChainService, OKXService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { ESTIMATED_GAS_WALLET, TOKEN_CONFIG } from './config';
import { FieldTypes } from './types';
import { getEstimatedGasCost, getGasCost, getSolverFee } from './utils';

@RegistryPlug('cross-chain-swap', 'v1')
@Injectable()
export class CrossChainSwapService extends ActionDto<FieldTypes> {
  constructor(
    private readonly okxService: OKXService,
    private readonly chainService: ChainService,
  ) {
    super();
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Cross Chain Swap',
      description:
        '<div>Perform cross-chain token swaps seamlessly across multiple networks</div>',
      networks: this.chainService.buildSupportedNetworks([Chains.ArbitrumOne]),
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
            type: 'searchSelect',
            options: [
              {
                label: 'WETH',
                value: 'weth',
              },
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
          },
          {
            name: 'tokenTo',
            label: 'Token To',
            desc: 'The address of the token you want to receive',
            type: 'input',
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
    const tokenFrom = TOKEN_CONFIG[additionalData.chainId][formData.tokenFrom];
    const tokenInAddress = tokenFrom.address;
    const params = {
      ...restParams,
      amountToBuy: ethers.parseUnits(amountToBuy, tokenFrom.decimal),
    };

    let approveTx: TransactionInfo;
    let swapTx: TransactionInfo;

    const provider = this.chainService.getProvider(chainId);

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenFrom.address,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (params.tokenFrom === 'weth') {
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenTo,
        params.amountToBuy,
      );
      const gasCost = await getGasCost(
        BigInt(
          (swapTx as TransactionInfo & { estimateGasFee: string })
            .estimateGasFee,
        ),
        provider,
      );

      const solverFee = await getSolverFee(params.amountToBuy);

      const totalFee = gasCost + solverFee;
      // Update the swap transaction with the new amount
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        params.tokenTo,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.requiredTokenAmount = tokens;
      return { transactions: [swapTx] };
    } else {
      //buy
      approveTx = await this.okxService.getApproveData(
        chainId,
        tokenInAddress,
        ethers.MaxUint256,
      );
      const approveGasCost = await getEstimatedGasCost(
        ESTIMATED_GAS_WALLET[chainId],
        approveTx.to,
        approveTx.data,
        approveTx.value,
        provider,
      );
      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );
      const swapGasCost = await getGasCost(
        BigInt(
          (swapTx as TransactionInfo & { estimateGasFee: string })
            .estimateGasFee,
        ),
        provider,
      );
      const totalGasCost = swapGasCost + approveGasCost;

      // Estimate gas cost in ERC20 tokens for the swap transaction
      const erc20GasCost = await this.okxService.getQuote(
        chainId,
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        tokenInAddress,
        totalGasCost,
      );

      const solverFee = await getSolverFee(params.amountToBuy);
      const totalFee = erc20GasCost + solverFee;

      swapTx = await this.okxService.getSwapData(
        account,
        chainId,
        tokenInAddress,
        params.tokenTo,
        BigInt(params.amountToBuy) - BigInt(totalFee),
      );
      swapTx.requiredTokenAmount = tokens;
      return { transactions: [approveTx, swapTx] };
    }
  }
}
