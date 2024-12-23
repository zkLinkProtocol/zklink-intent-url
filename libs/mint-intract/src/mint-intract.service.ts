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

@RegistryPlug('mint-intract', 'v1')
@Injectable()
export class MintIntractService extends ActionDto<FieldTypes> {
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
      Chains.BSCMainnet,
    ];
    if (this.isDev) {
      supportedNetwork.push(
        Chains.ZkLinkNovaSepolia,
        Chains.ArbitrumSepolia,
        Chains.BaseSepolia,
        Chains.BSCTestnet,
      );
    }
    return {
      title: 'Mint Intract NFT',
      description: '<div>This action allows you to mint Intract NFTs</div>',
      networks: this.chainService.buildSupportedNetworks(supportedNetwork),
      author: {
        name: 'Intract',
        github: 'https://quest.intract.io/',
      },
      magicLinkMetadata: {
        title: 'Mint Intract NFT',
        description: 'Mint Intract NFTs',
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
            name: 'price',
            label: 'NFT Price',
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

    const payable = ' payable';
    const abiParams = [];
    const funcParams = [];
    const txParams = [];
    const recipient = additionalData.account;
    abiParams.push('address _receiver');
    funcParams.push('address');
    txParams.push(recipient);
    abiParams.push('uint256 _quantity');
    funcParams.push('uint256');
    txParams.push(1);
    abiParams.push('address _currency');
    funcParams.push('address');
    txParams.push('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
    abiParams.push('uint256 _pricePerToken');
    funcParams.push('uint256');
    txParams.push(Number(formData.price));
    abiParams.push('tuple _allowlistProof');
    funcParams.push('tuple');
    txParams.push([
      [],
      1,
      Number(formData.price),
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    ]);
    abiParams.push('bytes _data');
    funcParams.push('bytes');
    txParams.push([]);

    // if (formData.recipient != 'none') {
    //   abiParams.push('address recipient');
    //   funcParams.push('address');
    //   if (formData.recipient == 'sender') {
    //     txParams.push(additionalData.account);
    //   } else {
    //     txParams.push(formData.recipient);
    //   }
    // }
    // if (Number(formData.quantity) > 0) {
    //   abiParams.push('uint quantity');
    //   funcParams.push('uint');
    //   txParams.push(Number(formData.quantity));
    // }
    // if (formData.ext != 'none') {
    //   abiParams.push('string ext');
    //   funcParams.push('string');
    //   txParams.push(formData.ext);
    // }
    const entrypoint = 'claim';
    const abi = new Interface([
      `function ${entrypoint}(${abiParams.join(',')})${payable}`,
    ]);

    const contract = new Contract(formData.contract.toString(), abi, provider);
    const mintTx = await contract[
      `${entrypoint}(${funcParams.join(',')})`
    ].populateTransaction.apply(this, txParams);
    const tx: TransactionInfo = {
      chainId: chainId,
      to: mintTx.to,
      value: ethers.parseEther(formData.price).toString(),
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return { transactions: [tx] };
  }
}
