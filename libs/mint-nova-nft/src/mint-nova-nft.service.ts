import { RegistryPlug } from '@action/registry';
import { ChainService, DataService } from '@core/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers, keccak256 } from 'ethers';
import { MerkleTree } from 'merkletreejs';
import {
  Action as ActionDto,
  ActionMetadata,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
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
  private logger: Logger = new Logger(MintNovaNftService.name);
  private readonly okxConfig: ConfigType['okx'];
  private readonly isDev: boolean;
  constructor(
    readonly configService: ConfigService,
    private readonly dataService: DataService,
    private readonly chainService: ChainService,
  ) {
    super();
    this.okxConfig = configService.get('okx', { infer: true })!;
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
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {
        title: 'Mint NFT',
        description:
          'Magic Link Enthusiast | Donate with your love for zkLink magic',
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

  async calcSignature(
    chainId: number,
    nftContractAddress: string,
    recipient: string,
    tokenId: number,
    expiry: number,
    stage: string,
    key: string,
  ) {
    const domain = {
      name: 'OKXMint',
      version: '1.0',
      chainId,
      verifyingContract: nftContractAddress,
    };
    const types = {
      MintAuth: [
        { name: 'to', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'amount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'expiry', type: 'uint256' },
        { name: 'stage', type: 'string' },
      ],
    };
    const message = {
      to: recipient,
      tokenId,
      amount: 1,
      nonce: tokenId,
      expiry,
      stage,
    };
    const signer = new ethers.Wallet(key);

    this.logger.log(
      JSON.stringify(domain),
      JSON.stringify(types),
      JSON.stringify(message),
    );
    return signer.signTypedData(domain, types, message);
  }

  async calcAllowlistProof(
    account: string,
  ): Promise<{ mintProof: string[]; inAllowList: boolean }> {
    //mock gets the list of addresses from the whitelisted address service
    const whiteAddressList = [
      '0xF0DB7cE565Cd7419eC2e6548603845a648f6594F',
      '0xD5412eD73895FdDa98957Ed694cf9BE94D690f69',
      '0x167aE2669a14609E9be1da8302A08839F077CB90',
      '0x00FC0446AB4c2F4D9D6d085C6c210445Baf9F534',
      '0x57749C34068C8Ec12B2E9D103fE32A3d0C46f702',
      '0xeB1195962aeb7D300e5BF59A0E0B452bC229D0e5',
      '0x0A7FA8D8B0B420c5f4849178a90960716509FE50',
      '0xe5a325ef78660df15b367d2f0e2469b4361c9884',
      '0x92815b16a0563271dcf34ba6597123c136b671f7',
      '0x7dfb98ac2167b16f667ad8ee3730cff849016a0f',
    ];
    if (!whiteAddressList.includes(account)) {
      return { mintProof: [], inAllowList: false };
    }

    const leaves = whiteAddressList.map((x) => keccak256(x));
    const merkleTree = new MerkleTree(leaves, keccak256, {
      sortLeaves: false,
      sortPairs: true,
    });

    this.logger.log(`Allowlist merkle hash: ${merkleTree.getHexRoot()}`);
    const leaf = keccak256(account);
    const mintProof = merkleTree.getHexProof(leaf);
    return { mintProof, inAllowList: true };
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
    if (!this.okxConfig.nftSignerPrivateKey) {
      throw new Error('missing NFT signer private key');
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
    let proof: string[] = [];
    if (formData.stage == 'Allowlist') {
      const { mintProof, inAllowList } = await this.calcAllowlistProof(account);
      if (!inAllowList) {
        throw new Error('You are not entitled to mint');
      }
      proof = mintProof;
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
    const signature = this.calcSignature(
      chainId,
      nftContractAddress,
      account,
      tokenId,
      expiry,
      formData.stage,
      this.okxConfig.nftSignerPrivateKey,
    );

    const mintTx = await contract.mint.populateTransaction(
      formData.stage,
      signature,
      proof,
      {
        amount: 1,
        tokenId,
        nonce: tokenId,
        expiry,
        to: account,
      },
    );
    const tx: TransactionInfo = {
      chainId,
      to: mintTx.to,
      value: ethers.parseEther(formData.fee).toString(),
      data: mintTx.data,
      shouldPublishToChain: true,
    };
    return { transactions: [tx] };
  }
}
