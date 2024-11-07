import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import DxFunFactoryABI from './abis/DxFunFactory.json';
import { DX_FUN_FACTORY_ADDRESS } from './config';
import { FieldTypes } from './types';

@RegistryPlug('dx-fun', 'v1')
@Injectable()
export class DxFunService extends ActionDto<FieldTypes> {
  private dxFunFactory: ethers.Contract;
  private provider: ethers.Provider;
  constructor(private readonly chainService: ChainService) {
    super();
    this.provider = chainService.getProvider(Chains.Base);
    this.dxFunFactory = new ethers.Contract(
      DX_FUN_FACTORY_ADDRESS,
      DxFunFactoryABI,
      this.provider,
    );
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'DxFun',
      description: '<div>Launch your own meme coin in dx.fun</div>',
      networks: this.chainService.buildSupportedNetworks([Chains.Base]),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        title: 'Launch your own meme coin in dx.fun',
      },
      intent: {
        components: [
          {
            name: 'coinName',
            label: 'Coin Name',
            desc: 'The name of the coin',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Coin Name',
          },
          {
            name: 'coinSymbol',
            label: 'Coin Symbol',
            desc: 'The symbol of the coin',
            type: 'input',
            regex: '^[a-zA-Z0-9]+$',
            regexDesc: 'Coin Symbol',
          },
          {
            name: 'coinIconUrl',
            label: 'Coin Icon URL',
            desc: 'The icon url of the coin',
            type: 'input',
            regex: '^(https?://.*.(?:png|jpg|jpeg|gif|bmp|svg|webp))$',
            regexDesc: 'Coin Icon URL',
          },
          {
            name: 'coinDescription',
            label: 'Coin description',
            desc: 'The description of the coin',
            type: 'input',
            regex: '',
            regexDesc: 'Coin description',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const {
      additionalData,
      formData: { coinName, coinSymbol, coinIconUrl, coinDescription },
    } = data;

    const metadata = `${coinIconUrl}@@@@@@@@@@@@@@@@@@@@${coinDescription}`;
    const coinTrasaction =
      await this.dxFunFactory.CreateFun.populateTransaction(
        coinName,
        coinSymbol,
        metadata,
        1000000000000000000000000000n, //_totalSupply
        100000000000000n, //_liquidityETHAmount
        '0x4200000000000000000000000000000000000006', //_baseToken
        '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24', //_router
        false, //_antiSnipe
        0n, //_amountAntiSnipe
      );

    return {
      transactions: [
        {
          chainId: additionalData.chainId,
          to: DX_FUN_FACTORY_ADDRESS,
          value: '0',
          data: coinTrasaction.data,
          shouldPublishToChain: true,
        },
      ],
    };
  }
}
