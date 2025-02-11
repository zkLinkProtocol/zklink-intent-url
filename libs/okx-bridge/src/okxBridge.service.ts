import { RegistryPlug } from '@action/registry';
import { ChainService, OKXService } from '@core/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
  UpdateFieldType,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
import { Chains } from 'src/constants';
import { FlashNewsBotService } from 'src/modules/tgbot/flashNewsBot.service';
import { Address, ErrorMessage } from 'src/types';

import { FieldTypes } from './types';

@RegistryPlug('okx-bridge', 'v1')
@Injectable()
export class OkxBridgeService extends ActionDto<FieldTypes> {
  private logger = new Logger(OkxBridgeService.name);
  private readonly chains: ConfigType['chains'];
  constructor(
    private readonly flashNewsBotService: FlashNewsBotService,
    private readonly okxService: OKXService,
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.chains = this.configService.get('chains', { infer: true })!;
  }
  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Bridge via OKX Bridge',
      description:
        '<div>This action allows you to bridge cryptocurrency between networks</div>',
      networks: this.chainService.buildSupportedNetworks([
        Chains.ArbitrumOne,
        Chains.EthereumMainnet,
        Chains.OpMainnet,
        Chains.Linea,
        Chains.Base,
        Chains.MantaPacificMainnet,
        Chains.BSCMainnet,
      ]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        title: 'Bridge Now!',
        description: 'Bridge your cryptocurrency between different networks.',
      },
      intent: {
        binding: 'bridgeAmount',
        components: [
          {
            name: 'bridgeAmount',
            label: 'Bridge Amount',
            desc: 'The amount of input tokens used to swap output tokens in target network',
            type: 'input',
            regex: '^[0-9]+(.[0-9]+)?$',
            regexDesc: 'Positive number',
          },
          {
            name: 'tokenFrom',
            label: 'Pay Token',
            desc: 'The token you want to cross chain',
            type: 'inputSelect',
            options: [
              {
                label: 'ETH',
                value: 'ETH',
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
            ],
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid Address',
          },
          {
            name: 'toChainId',
            label: 'Select Receive Token Network',
            desc: 'Receive Token Network',
            type: 'searchSelect',
            options: this.chainService.buildChainOptions([
              Chains.Base,
              Chains.ArbitrumOne,
              Chains.EthereumMainnet,
              Chains.OpMainnet,
              Chains.Linea,
              Chains.MantaPacificMainnet,
              Chains.BSCMainnet,
            ]),
          },
          {
            name: 'tokenTo',
            label: 'Receive Token',
            desc: 'The address of the token you want to receive in target network',
            type: 'inputSelect',
            options: [
              {
                label: 'ETH',
                value: 'ETH',
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
    const { chainId: fromChainId, account } = additionalData;
    if (!account) {
      throw new Error('Missing account!');
    }
    const { bridgeAmount, toChainId, ...restParams } = formData;
    const provider = this.chainService.getProvider(fromChainId);

    let tokenFromDecimal;
    let tokenInAddress = formData.tokenFrom.toLowerCase() as Address;

    if (tokenInAddress === ethers.ZeroAddress) {
      tokenInAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
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
      amountToBuy: ethers.parseUnits(bridgeAmount, tokenFromDecimal),
      tokenTo:
        formData.tokenTo.toLowerCase() === ethers.ZeroAddress
          ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
          : formData.tokenTo,
    };

    let approveTx: TransactionInfo;
    let bridgeTx: TransactionInfo & {
      tokens: Array<{
        tokenAddress: string;
        amount: string;
        direction?: 'from' | 'to';
      }>;
    };

    const tokens: TransactionInfo['requiredTokenAmount'] = [
      {
        token: tokenInAddress,
        amount: params.amountToBuy.toString(),
      },
    ];

    if (
      tokenInAddress.toLowerCase() ===
      '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    ) {
      bridgeTx = await this.okxService.getBridgeData(
        fromChainId,
        toChainId,
        account,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      bridgeTx.requiredTokenAmount = tokens;
      return {
        displayInfo: { tokens: bridgeTx.tokens },
        transactions: [bridgeTx],
      };
    } else {
      //buy
      approveTx = await this.okxService.getApproveData(
        fromChainId,
        tokenInAddress,
        ethers.MaxUint256,
      );

      bridgeTx = await this.okxService.getBridgeData(
        fromChainId,
        toChainId,
        account,
        tokenInAddress,
        params.tokenTo,
        params.amountToBuy,
      );

      bridgeTx.requiredTokenAmount = tokens;
      return {
        displayInfo: { tokens: bridgeTx.tokens },
        transactions: [approveTx, bridgeTx],
      };
    }
  }

  async validateFormData(
    formData: UpdateFieldType<FieldTypes, 'bridgeAmount'>,
  ): Promise<ErrorMessage> {
    const { chainId: fromChainId, toChainId } = formData;
    if (!fromChainId || !toChainId) {
      return 'Missing fromChainId or toChainId';
    }
    for (const amount of formData.bridgeAmount) {
      if (!this.isNumeric(amount)) return 'Amount must be a number';

      const checkParasm: GenerateTransactionParams<FieldTypes> = {
        additionalData: {
          chainId: fromChainId,
          // just for pre-check swap conditions,it can be any address
          account: '0xA510dbc9aC79a686EBB78cDaE791d91F3f45b3a9',
        },
        formData: {
          bridgeAmount: amount,
          tokenFrom: formData.tokenFrom,
          tokenTo: formData.tokenTo,
          toChainId: formData.toChainId,
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
    if (!this.isNumeric(params.formData.bridgeAmount))
      return 'Amount must be a number';
    return '';
  }

  private isNumeric(value: string): boolean {
    const num = Number(value);
    return !isNaN(num);
  }
}
