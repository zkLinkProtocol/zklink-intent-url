import { RegistryPlug } from '@action/registry';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  BasicAdditionalParams,
  GenerateTransactionParams,
  TransactionInfo,
  isOptionComponentDto,
} from 'src/common/dto';

import PumpFunABI from './abis/PumpFun.json';
import PumpFunFactoryABI from './abis/PumpFunFactory.json';
import { PUMP_FUN_FACTORY_ADDRESS, metadata } from './config';
import { FormName } from './types';

@RegistryPlug('pump-fun', 'v1')
@Injectable()
export class PumpFunService extends ActionDto<FormName> {
  private pumpFunFactory: ethers.Contract;
  private provider: ethers.Provider;
  constructor() {
    super();
    this.provider = new ethers.JsonRpcProvider('https://sepolia.rpc.zklink.io');
    this.pumpFunFactory = new ethers.Contract(
      PUMP_FUN_FACTORY_ADDRESS,
      PumpFunFactoryABI.abi,
      this.provider,
    );
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const stringSalt = additionalData.code;
    const creator = '0x';
    const tokenAddress = await this.pumpFunFactory.getCreate2Address(
      formData.tokenName,
      formData.tokenSymbol,
      creator,
      stringSalt,
    );

    const tokenContract = new ethers.Contract(
      tokenAddress,
      PumpFunABI.abi,
      this.provider,
    );

    const buyData = await tokenContract.buy.populateTransaction();

    return [
      {
        chainId: additionalData.chainId,
        to: tokenAddress,
        value: ethers.parseEther(formData.buyAmount).toString(),
        data: buyData.data,
        shouldPublishToChain: true,
      },
    ];
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FormName>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const stringSalt = additionalData.code;
    const createPumpFunData =
      await this.pumpFunFactory.createPumpFun.populateTransaction(
        formData.tokenName,
        formData.tokenSymbol,
        stringSalt,
      );

    return [
      {
        //TODO
        chainId: 810181,
        to: PUMP_FUN_FACTORY_ADDRESS,
        value: ethers.parseEther(formData.creatorInitialBuyAmount).toString(),
        data: createPumpFunData.data,
        shouldPublishToChain: true,
      },
    ];
  }
}
