import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, Interface, ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { FieldTypes } from './types';

@RegistryPlug('mint-nft', 'v1')
@Injectable()
export class MintNftService extends ActionDto<FieldTypes> {
  private readonly isDev: boolean;
  constructor(
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.isDev = this.configService.get('env')! === 'dev';
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    const supportedNetwork = [
      Chains.ZkLinkNova,
      Chains.ArbitrumOne,
      Chains.EthereumMainnet,
      Chains.Base,
      Chains.Linea,
      Chains.MantaPacificMainnet,
      Chains.OpMainnet,
      Chains.ScrollMainnet,
    ];
    if (this.isDev) {
      supportedNetwork.push(
        Chains.ZkLinkNovaSepolia,
        Chains.ArbitrumSepolia,
        Chains.BaseSepolia,
      );
    }
    return {
      title: 'Mint NFT',
      description: '<div>This action allows you to mint NFT</div>',
      networks: this.chainService.buildSupportedNetworks(supportedNetwork),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        title: 'Mint NFT',
        description:
          'magicLink Enthusiast | Donate with your love for zkLink magic',
      },
      intent: {
        binding: true,
        components: [
          {
            name: 'contract',
            label: 'NFT Contract Address',
            desc: 'Enter the NFT contract address',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid Address',
          },
          {
            name: 'entrypoint',
            label: 'Mint Func',
            desc: 'Entry point of the mint function',
            type: 'input',
            regex: '^[a-zA-Z0-9$_]+$',
            regexDesc: 'Func',
            defaultValue: 'mint',
          },
          {
            name: 'recipient',
            label:
              "Recipient Address (leave it to none if the NFT contract don't need it, leave it to sender for transaction sender)",
            desc: "NFT recipient address, leave it to none if the NFT contract don't need it, leave it to sender for transaction sender",
            type: 'input',
            regex: '^(0x[a-fA-F0-9]{40})|(none)|(sender)$',
            regexDesc: 'Address',
            defaultValue: 'none',
          },
          {
            name: 'quantity',
            label:
              "Quantity (leave it to 0 if the NFT contract don't support batch mint)",
            desc: "Quantity of NFTs to mint, leave it to 0 if the NFT contract don't support batch mint",
            type: 'input',
            regex: '^\\d+$',
            regexDesc: 'Quantity',
            defaultValue: '0',
          },
          {
            name: 'ext',
            label:
              "Extension Data, (leave it to none if the NFT contract don't need it)",
            desc: "Extension metadata of the NFT, leave it to none if the NFT contract don't need it",
            type: 'input',
            regex: '^.*$',
            regexDesc: 'metadata',
            defaultValue: 'none',
          },
          {
            name: 'value',
            label: 'Transaction Value (leave it to 0 for free mint NFT)',
            desc: 'The NFT mint fee, leave it to 0 for free mint NFT',
            type: 'input',
            regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
            regexDesc: 'Must be a number',
            defaultValue: '0',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    const { chainId } = additionalData;
    const provider = this.chainService.getProvider(chainId);

    const payable = Number(formData.value) > 0 ? ' payable' : '';
    const abiParams = [];
    const funcParams = [];
    const txParams = [];
    if (formData.recipient != 'none') {
      abiParams.push('address recipient');
      funcParams.push('address');
      if (formData.recipient == 'sender') {
        txParams.push(additionalData.account);
      } else {
        txParams.push(formData.recipient);
      }
    }
    if (Number(formData.quantity) > 0) {
      abiParams.push('uint quantity');
      funcParams.push('uint');
      txParams.push(Number(formData.quantity));
    }
    if (formData.ext != 'none') {
      abiParams.push('string ext');
      funcParams.push('string');
      txParams.push(formData.ext);
    }
    const abi = new Interface([
      `function ${formData.entrypoint}(${abiParams.join(',')})${payable}`,
    ]);

    const contract = new Contract(formData.contract.toString(), abi, provider);
    const mintTx = await contract[
      `${formData.entrypoint}(${funcParams.join(',')})`
    ].populateTransaction.apply(this, txParams);
    const tx: TransactionInfo = {
      chainId: chainId,
      to: mintTx.to,
      value: ethers.parseEther(formData.value).toString(),
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return { transactions: [tx] };
  }
}
