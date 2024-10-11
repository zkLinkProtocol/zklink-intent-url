import { RegistryPlug } from '@action/registry';
import { DataService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {
  Action as ActionDto,
  GenerateTransactionParams,
  TransactionInfo,
} from 'src/common/dto';

import PumpFunABI from './abis/PumpFun.json';
import PumpFunFactoryABI from './abis/PumpFunFactory.json';
import {
  CHAIN_ID,
  POOL_FACTORY_CONTRACT_ADDRESS,
  PUMP_FUN_FACTORY_ADDRESS,
  SWAP_ROUTER_CONTRACT_ADDRESS,
  metadata,
} from './config';
import { NovaSwap } from './swap';
import { FieldTypes } from './types';

@RegistryPlug('pump-fun', 'v1')
@Injectable()
export class PumpFunService extends ActionDto<FieldTypes> {
  private pumpFunFactory: ethers.Contract;
  private provider: ethers.Provider;
  private novaswap: NovaSwap;
  constructor(private readonly dataService: DataService) {
    super();
    this.provider = new ethers.JsonRpcProvider('https://sepolia.rpc.zklink.io');
    this.pumpFunFactory = new ethers.Contract(
      PUMP_FUN_FACTORY_ADDRESS,
      PumpFunFactoryABI.abi,
      this.provider,
    );
    this.novaswap = new NovaSwap(
      this.provider,
      POOL_FACTORY_CONTRACT_ADDRESS,
      SWAP_ROUTER_CONTRACT_ADDRESS,
      CHAIN_ID,
    );
  }

  async getMetadata() {
    return metadata;
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const stringSalt = additionalData.code;

    const creatorInfo = await this.dataService.getMagicLinkCreatorInfoByCode(
      additionalData.code!,
    );
    if (!creatorInfo) {
      throw new Error('Creator information not found for the given code.');
    }
    const creator = creatorInfo.address;

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

    const isPaused = await tokenContract.isPaused();
    if (isPaused) {
      if (formData.orderType === 'buy') {
        return await this.novaswap.swapToken(
          ethers.ZeroAddress,
          tokenAddress,
          ethers.parseEther(formData.buyAmount),
          additionalData.account!,
          3000,
        );
      } else {
        const userBalance = await tokenContract.balanceOf(
          additionalData.account!,
        );
        const sellAmount =
          (Number(formData.sellPercent) * Number(userBalance)) / 100;
        const approveData = await tokenContract.approve.populateTransaction(
          SWAP_ROUTER_CONTRACT_ADDRESS,
          BigInt(sellAmount),
        );
        const sellTx = await this.novaswap.swapToken(
          tokenAddress,
          ethers.ZeroAddress,
          BigInt(sellAmount),
          additionalData.account!,
          3000,
        );
        return [
          {
            chainId: additionalData.chainId,
            to: tokenAddress,
            value: '0',
            data: approveData.data,
            shouldPublishToChain: true,
          },
          sellTx[0],
        ];
      }
    } else {
      if (formData.orderType === 'buy') {
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
      } else {
        const userBalance = await tokenContract.balanceOf(
          additionalData.account!,
        );
        const sellAmount =
          (Number(formData.sellPercent) * Number(userBalance)) / 100;
        const sellData = await tokenContract.sell.populateTransaction(
          BigInt(sellAmount),
        );
        return [
          {
            chainId: additionalData.chainId,
            to: tokenAddress,
            value: '0',
            data: sellData.data,
            shouldPublishToChain: true,
          },
        ];
      }
    }
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
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
        chainId: CHAIN_ID,
        to: PUMP_FUN_FACTORY_ADDRESS,
        value: ethers.parseEther(formData.creatorInitialBuyAmount).toString(),
        data: createPumpFunData.data,
        shouldPublishToChain: true,
      },
    ];
  }
}
