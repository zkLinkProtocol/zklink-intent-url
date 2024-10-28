import { RegistryPlug } from '@action/registry';
import { ChainService, DataService } from '@core/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from 'ethers';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { Chains } from 'src/constants';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';

import ERC721ABI from './abis/ERC721.json';
import { FieldTypes } from './types';

@RegistryPlug('mint-nova-nft', 'v1')
@Injectable()
export class MintNovaNftService extends ActionDto<FieldTypes> {
  private readonly isDev: boolean;
  constructor(
    readonly configService: ConfigService,
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
  ) {
    super();
    this.isDev = this.configService.get('env')! === 'dev';
  }

  async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    const supportedNetwork = [Chains.ZkLinkNova];
    if (this.isDev) {
      supportedNetwork.push(Chains.ZkLinkNovaSepolia);
    }
    return {
      title: 'Mint Nova Cubo NFT',
      description: '<div>This action allows you to mint Nova Cubo NFT</div>',
      networks: this.chainService.buildSupportedNetworks(supportedNetwork),
      author: {
        name: 'zkLink Labs',
        github: 'https://github.com/zkLinkProtocol',
      },
      magicLinkMetadata: {
        title: 'Cubo the Block',
        description:
          'Description: The Cubo NFT Genesis Collection will generate 50k different NFTs, holders of the NFT will get bonus points for selected future zkLink Nova campaign.',
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
            name: 'stage',
            label: 'Mint Stage',
            desc: 'NFT Mint Stage',
            type: 'searchSelect',
            options: [
              {
                label: 'Whitelist Only',
                value: 'Allowlist',
              },
              {
                label: 'Public Mint',
                value: 'Public',
              },
            ],
          },
          {
            name: 'tokenId',
            label: 'Start Token ID',
            desc: 'Start Token ID',
            type: 'input',
            regex: '^\\d+$',
            regexDesc: 'Key',
            defaultValue: '10',
          },
          {
            name: 'fee',
            label: 'Transaction Value',
            desc: 'The NFT mint fee',
            type: 'input',
            regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
            regexDesc: 'Must be a number',
            defaultValue: '0.00001',
          },
        ],
      },
    };
  }

  async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData, formData } = data;
    const { code, chainId, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }
    if (!account) {
      throw new Error('missing account');
    }

    const provider = this.chainService.getProvider(chainId);
    const nftContractAddress = formData.contract;

    const contract = new Contract(nftContractAddress, ERC721ABI, provider);
    try {
      await contract.validateActive(formData.stage);
      await contract.validateAmount(1, account, formData.stage);
    } catch (error) {
      throw new Error(
        `Can't mint NFT in ${formData.stage} stage, Reason: ${error.revert.name}`,
      );
    }

    let tokenId = Number(formData.tokenId);
    const result = await this.dataService.findRecordByCode(code);
    if (result) {
      const intentionRecordTxs: IntentionRecordTx[] = result
        .map((r) => r.intentionRecordTxs)
        .flat();
      for (const recordTx of intentionRecordTxs) {
        if (recordTx.status === IntentionRecordTxStatus.SUCCESS) {
          tokenId++;
        }
      }
    }

    const expiry = Math.round(Date.now() / 1000) + 60 * 60;
    try {
      const res = await fetch(
        'https://gruesome-coffin-wr7qq5p99r9ph9pwv-10080.app.github.dev/mint',
        {
          method: 'post',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            recipient: additionalData.account,
            tokenId,
            expiry,
            stage: formData.stage,
          }),
        },
      );
      const resTx = await res.json();
      if (resTx.errorMessage) {
        throw new Error(resTx.error);
      }
      const tx: TransactionInfo = {
        chainId,
        to: resTx.to,
        value: ethers.parseEther(formData.fee).toString(),
        data: resTx.data,
        shouldPublishToChain: true,
      };
      return { transactions: [tx] };
    } catch (err) {
      throw new Error(err);
    }
  }
}
