import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
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
    const abi = [
      {
        inputs: [
          { internalType: 'address', name: '_receiver', type: 'address' },
          { internalType: 'uint256', name: '_quantity', type: 'uint256' },
          { internalType: 'address', name: '_currency', type: 'address' },
          { internalType: 'uint256', name: '_pricePerToken', type: 'uint256' },
          {
            components: [
              { internalType: 'bytes32[]', name: 'proof', type: 'bytes32[]' },
              {
                internalType: 'uint256',
                name: 'quantityLimitPerWallet',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'pricePerToken',
                type: 'uint256',
              },
              { internalType: 'address', name: 'currency', type: 'address' },
            ],
            internalType: 'struct IDrop.AllowlistProof',
            name: '_allowlistProof',
            type: 'tuple',
          },
          { internalType: 'bytes', name: '_data', type: 'bytes' },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ];
    const recipient = additionalData.account;

    const contract = new ethers.Contract(
      formData.contract.toString(),
      abi,
      provider,
    );

    const mintTx = await contract.claim(
      recipient,
      1,
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      ethers.parseUnits(formData.price, 'ether'),
      {
        proof: [], // Example proof (replace with real proof data)
        quantityLimitPerWallet: 1,
        pricePerToken: ethers.parseUnits(formData.price, 'ether'),
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      },
      '0x',
      {
        value: ethers.parseUnits(formData.price, 'ether'), // Sending ETH equivalent to total price
      },
    );

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
