import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';

import { RegistryPlug } from '@action/registry';
import { ChainService } from '@core/shared';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';

import { FieldTypes } from './types';

interface ClaimSignatureResponse {
  claimData: {
    signature: string;
    functionName: string;
    chainId: string;
    contractAddress: string;
    functionParams: [
      {
        to: string;
        royaltyRecipient: string;
        royaltyBps: string;
        primarySaleRecipient: string;
        uri: string;
        price: string;
        currency: string;
        validityStartTimestamp: number;
        validityEndTimestamp: number;
        uid: string;
      },
      string,
    ];
  };
  message: string;
  success: boolean;
}

// Mint Intract NFT for Base plus claim function
@RegistryPlug('mint-intract-v2', 'v1')
@Injectable()
export class MintIntractV2Service extends ActionDto<FieldTypes> {
  private readonly isDev: boolean;
  constructor(
    private readonly chainService: ChainService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.isDev = this.configService.get('env')! === 'dev';
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    const supportedNetwork = [Chains.Base];

    return {
      title: 'Mint Intract V2 NFT',
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
            regex: '^[a-zA-Z0-9]+$',
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

  async getClaimSignature(walletAddress: string | undefined, nftId: string) {
    try {
      const response: AxiosResponse<ClaimSignatureResponse> = await axios({
        method: 'get',
        url: 'https://gcp-api.intract.io/api/qv1/compass-nft/claim-signature-v2',
        params: {
          walletAddress: walletAddress,
          nftId: nftId,
          chain: 'base',
          namespaceTag: 'EVM::EVM',
        },
        headers: {
          Accept: 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    console.log(
      'Input data, additionalData : ',
      additionalData.account,
      ' ',
      additionalData.chainId,
    );
    console.log(
      'Input data, Form data  : ',
      formData.price,
      ' ',
      formData.contract,
    );
    const nftId = formData.contract.toString();
    const recipient = additionalData.account;
    const claimSignatureObj = await this.getClaimSignature(recipient, nftId);
    const _signature = claimSignatureObj.claimData.signature;
    const contractAddress = claimSignatureObj.claimData.contractAddress;
    console.log(
      'Price per token : ',
      ethers.parseUnits(formData.price, 'ether'),
    );
    const chainId = additionalData.chainId;
    console.log('Chain ID : ', chainId);
    const provider = this.chainService.getProvider(chainId);
    console.log('Provider : ', provider);
    const abi = [
      {
        inputs: [
          {
            components: [
              { internalType: 'address', name: 'to', type: 'address' },
              {
                internalType: 'address',
                name: 'royaltyRecipient',
                type: 'address',
              },
              { internalType: 'uint256', name: 'royaltyBps', type: 'uint256' },
              {
                internalType: 'address',
                name: 'primarySaleRecipient',
                type: 'address',
              },
              { internalType: 'string', name: 'uri', type: 'string' },
              { internalType: 'uint256', name: 'price', type: 'uint256' },
              { internalType: 'address', name: 'currency', type: 'address' },
              {
                internalType: 'uint128',
                name: 'validityStartTimestamp',
                type: 'uint128',
              },
              {
                internalType: 'uint128',
                name: 'validityEndTimestamp',
                type: 'uint128',
              },
              { internalType: 'bytes32', name: 'uid', type: 'bytes32' },
            ],
            internalType: 'struct ITokenERC721.MintRequest',
            name: '_req',
            type: 'tuple',
          },
          { internalType: 'bytes', name: '_signature', type: 'bytes' },
        ],
        name: 'mintWithSignature',
        outputs: [
          { internalType: 'uint256', name: 'tokenIdMinted', type: 'uint256' },
        ],
        stateMutability: 'payable',
        type: 'function',
      },
    ];

    console.log('Recipient : ', recipient);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    console.log('Contract Object : ', contract);
    const _req = {
      to: claimSignatureObj.claimData.functionParams[0].to,
      royaltyRecipient:
        claimSignatureObj.claimData.functionParams[0].royaltyRecipient,
      royaltyBps: claimSignatureObj.claimData.functionParams[0].royaltyBps,
      primarySaleRecipient:
        claimSignatureObj.claimData.functionParams[0].primarySaleRecipient,
      uri: claimSignatureObj.claimData.functionParams[0].uri,
      price: ethers.parseUnits(formData.price, 'ether'),
      currency: claimSignatureObj.claimData.functionParams[0].currency,
      validityStartTimestamp:
        claimSignatureObj.claimData.functionParams[0].validityStartTimestamp,
      validityEndTimestamp:
        claimSignatureObj.claimData.functionParams[0].validityEndTimestamp,
      uid: claimSignatureObj.claimData.functionParams[0].uid,
    };
    const mintTx = await contract.mintWithSignature.populateTransaction(
      _req,
      _signature,
      {
        value: ethers.parseUnits(formData.price, 'ether'), // Sending ETH equivalent to total price
      },
    );
    console.log('This is the minTx Object: ', mintTx);

    const tx: TransactionInfo = {
      chainId: chainId,
      to: mintTx.to,
      value: ethers.parseEther(formData.price).toString(),
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    console.log('This is the tx Object: ', tx);
    return { transactions: [tx] };
  }
}
