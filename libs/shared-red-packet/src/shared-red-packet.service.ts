import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Interface,
  ethers,
  formatUnits,
  getBigInt,
  keccak256,
  parseUnits,
  toUtf8Bytes,
} from 'ethers';

import { RegistryPlug } from '@action/registry';
import { ChainService, DataService } from '@core/shared';
import { getERC20SymbolAndDecimals } from '@core/utils';
import {
  Action as ActionDto,
  ActionMetadata,
  BasicAdditionalParams,
  GenerateTransactionParams,
  GenerateTransactionResponse,
  TransactionInfo,
  ValidateFormData,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
import {
  IntentionRecordTx,
  IntentionRecordTxStatus,
} from 'src/entities/intentionRecordTx.entity';
import { TgbotService } from 'src/modules/tgbot/tgbot.service';
import { Address, ErrorMessage } from 'src/types';

import ERC20ABI from './abis/ERC20.json';
import MemeRedPacketABI from './abis/MemeRedPacket.json';
import { TransactionResult, Value, configuration } from './config';
import {
  ClaimRedPacketParams,
  CreateRedPacketParams,
  DistributionModeValue,
  FieldTypes,
  GasTokenValue,
} from './type';

const PACKET_HASH = ethers.keccak256(ethers.toUtf8Bytes('REDPACKET'));

@RegistryPlug('shared-red-packet', 'v1')
@Injectable()
export class SharedRedPacketService extends ActionDto<FieldTypes> {
  private readonly logger = new Logger(SharedRedPacketService.name);
  public redPacketContract: ethers.Contract;
  private wallet: ethers.Wallet;
  private provider: ethers.Provider;
  readonly env: ConfigType['env'];
  readonly witnessPrivateKey: ConfigType['witnessPrivateKey'];
  readonly config: Value;

  constructor(
    readonly configService: ConfigService,
    private readonly dataService: DataService,
    private readonly tgbotService: TgbotService,
    private readonly chainService: ChainService,
  ) {
    super();
    this.env = configService.get('env', { infer: true })!;
    this.witnessPrivateKey = configService.get('witnessPrivateKey', {
      infer: true,
    })!;
    this.config = configuration[this.env];
    this.provider = this.chainService.getProvider(this.config.chainId);

    this.wallet = new ethers.Wallet(this.witnessPrivateKey, this.provider);

    this.redPacketContract = new ethers.Contract(
      this.config.redPacketContractAddress,
      MemeRedPacketABI,
      this.wallet,
    );
  }

  public async getMetadata(): Promise<ActionMetadata<FieldTypes>> {
    return {
      title: 'Shared Red Packet 🧧',
      description:
        '<div>This action is designed to distribute token rewards</div>',
      networks: this.chainService.buildSupportedNetworks([this.config.chainId]),
      author: { name: 'zkLink', github: 'https://github.com/zkLinkProtocol' },
      magicLinkMetadata: {
        title: 'Shared Red Packet 🧧',
        description: 'Best wishes!',
      },
      intent: {
        binding: true,
        components: [
          {
            name: 'distributionMode',
            label: 'Distribution Method',
            desc: 'Choose Mode to distribute Red Envelopes',
            type: 'searchSelect',
            options: [
              {
                label: 'Equal Amount Per Address',
                value: DistributionModeValue.EqualAmountPerAddress,
              },
              {
                label: 'Random Amount Per Address',
                value: DistributionModeValue.RandomAmountPerAddress,
              },
            ],
          },
          {
            name: 'totalDistributionAmount',
            label: 'Total Token Amount',
            desc: 'The total amount of tokens to be distributed',
            type: 'input',
            regex: '^\\d+\\.?\\d*$|^\\d*\\.\\d+$',
            regexDesc: 'It should be a valid number',
          },
          {
            name: 'distributionToken',
            label: 'Token to Distribute',
            desc: 'Choose a token to distribute',
            type: 'input',
            regex: '^0x[a-fA-F0-9]{40}$',
            regexDesc: 'Invalid address',
          },
          {
            name: 'amountOfRedEnvelopes',
            label: 'Number of Red Packets',
            desc: 'Total number of Red Packets',
            type: 'input',
            regex: '^[1-9]\\d*$',
            regexDesc: 'It should be a positive integer.',
          },
          {
            name: 'gasToken',
            label: 'Who should pay for the claiming gas fee',
            desc: 'Gas Token',
            type: 'searchSelect',
            options: [
              {
                label: 'Recipient',
                value: GasTokenValue.Eth,
              },
            ],
          },
          {
            name: 'isInvitable',
            label: 'Whether to give a commission to the inviter',
            desc: 'When this switch is turned on, users who share the magicLink will receive a portion of the recipient’s red envelope reward.',
            type: 'switch',
          },
        ],
      },
    };
  }

  public async validateFormData(formData: ValidateFormData<FieldTypes>) {
    const { amountOfRedEnvelopes } = formData;
    if (
      Number(amountOfRedEnvelopes) < 200 ||
      Number(amountOfRedEnvelopes) > 10000
    ) {
      return 'Number of Red Packets should be between 200 and 10000';
    }
    return '';
  }

  private async genCreateSignature(params: CreateRedPacketParams) {
    const domain = {
      name: 'MemeRedPacket',
      version: '0',
      chainId: this.config.chainId,
      verifyingContract: this.config.redPacketContractAddress,
    };

    const types = {
      CreateMemeRedPacket: [
        { name: 'creator', type: 'address' },
        { name: 'token', type: 'address' },
        { name: 'totalCount', type: 'uint256' },
        { name: 'tokenAmount', type: 'uint256' },
        { name: 'totalShare', type: 'uint256' },
        { name: 'packetHash', type: 'bytes32' },
        { name: 'isRandom', type: 'bool' },
        { name: 'isInvitable', type: 'bool' },
        { name: 'expiry', type: 'uint256' },
      ],
    };

    const signMessage = {
      creator: params.creator,
      token: params.token,
      totalCount: params.totalCount,
      tokenAmount: params.tokenAmount,
      totalShare: params.totalShare,
      packetHash: params.packetHash,
      isRandom: params.isRandom,
      isInvitable: params.isInvitable,
      expiry: params.expiry,
    };
    const signature = await this.wallet.signTypedData(
      domain,
      types,
      signMessage,
    );

    return signature;
  }

  private async genClaimSignature(params: ClaimRedPacketParams) {
    const domain = {
      name: 'MemeRedPacket',
      version: '0',
      chainId: this.config.chainId,
      verifyingContract: this.config.redPacketContractAddress,
    };

    const types = {
      MemeRedPacketClaim: [
        { name: 'id', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'inviter', type: 'address' },
        { name: 'expiry', type: 'uint256' },
      ],
    };

    const signMessage = {
      id: params.id,
      recipient: params.recipient,
      inviter: params.inviter,
      expiry: params.expiry,
    };

    const signature = await this.wallet.signTypedData(
      domain,
      types,
      signMessage,
    );

    return signature;
  }

  private genTotalShare(count: number): number {
    const abiCoder = new ethers.AbiCoder();
    let newHash = PACKET_HASH;
    let totalShare = 0;
    for (let i = 0; i < count; i++) {
      newHash = ethers.keccak256(abiCoder.encode(['bytes32'], [newHash]));
      const newHashBigInt = BigInt(newHash);
      const share = Number(newHashBigInt % 10n) + 1;
      totalShare += share;
    }
    return totalShare;
  }

  private async getDecimals(tokenAddress: string): Promise<bigint> {
    const contract = new ethers.Contract(tokenAddress, ERC20ABI, this.provider);
    const decimals = await contract.decimals();
    return decimals;
  }

  private getPacketIDByCode(code: string) {
    const hash = keccak256(toUtf8Bytes(code));
    const id = getBigInt(hash);
    return id;
  }

  public async onMagicLinkCreated(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<TransactionInfo[]> {
    const { additionalData, formData } = data;
    const { code, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }
    const id = this.getPacketIDByCode(code);
    const {
      distributionMode,
      totalDistributionAmount,
      distributionToken,
      amountOfRedEnvelopes,
      isInvitable,
    } = formData;

    const totalShare = this.genTotalShare(parseInt(amountOfRedEnvelopes));
    const packetHash = PACKET_HASH;
    const isRandom =
      distributionMode === DistributionModeValue.RandomAmountPerAddress;

    const decimals = await this.getDecimals(distributionToken);
    const totalDistributionAmountBn = parseUnits(
      totalDistributionAmount,
      decimals,
    );
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;

    const tokenContract = new ethers.Contract(
      distributionToken,
      ERC20ABI,
      this.provider,
    );
    const approveData = await tokenContract.approve.populateTransaction(
      this.config.redPacketContractAddress,
      totalDistributionAmountBn,
    );

    const signature = await this.genCreateSignature({
      creator: account as Address,
      token: distributionToken as Address,
      totalCount: parseInt(amountOfRedEnvelopes),
      tokenAmount: totalDistributionAmountBn,
      totalShare: totalShare,
      packetHash: packetHash,
      isRandom: isRandom,
      isInvitable: isInvitable,
      expiry: expiry,
    });

    const createRedPacketData =
      await this.redPacketContract.createRedPacket.populateTransaction(
        id,
        distributionToken,
        amountOfRedEnvelopes,
        totalDistributionAmountBn,
        totalShare,
        packetHash,
        isRandom,
        isInvitable,
        expiry,
        signature,
      );

    const transactions = [];

    const allowance = await tokenContract.allowance(
      additionalData.account,
      this.config.redPacketContractAddress,
    );
    if (totalDistributionAmountBn > allowance) {
      transactions.push({
        chainId: this.config.chainId,
        to: approveData.to,
        value: '0',
        data: approveData.data,
        shouldPublishToChain: true,
      });
    }

    transactions.push({
      chainId: this.config.chainId,
      to: createRedPacketData.to,
      value: '0',
      data: createRedPacketData.data,
      shouldPublishToChain: true,
    });

    return transactions;
  }

  public async preCheckTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ) {
    const { additionalData } = data;
    const { code, account } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }
    const packetId = this.getPacketIDByCode(code);
    const hasClaimed = await this.redPacketContract.isClaimed(
      packetId,
      account,
    );
    if (hasClaimed) {
      return 'User has already received';
    }
    const hasUnclaimedPacket =
      await this.redPacketContract.getRedPacketBalance(packetId);
    if (hasUnclaimedPacket.unClaimedCount === 0n) {
      return 'The red packet has been fully claimed';
    }
    return '';
  }

  async parseClaimEventLog(txHash: string) {
    const iface = new ethers.Interface(MemeRedPacketABI);
    const eventTopic = ethers.id('RedPacketClaimed(uint256,address,uint256)');
    try {
      const receipt = await this.provider.getTransactionReceipt(txHash);
      if (!receipt) {
        throw new Error('wrong transaction hash');
      }
      const log = receipt.logs.find((log) => {
        return log.topics[0] === eventTopic;
      });
      if (!log) {
        throw new Error('parse log error');
      }
      const parsedLog = iface.parseLog(log);
      if (!parsedLog?.args) {
        throw new Error('parse log args error');
      }
      const { id, recipient, amount } = parsedLog.args;

      return {
        id: id.toString(),
        recipient: recipient,
        amount: amount.toString(),
      };
    } catch (error) {
      throw new Error(`Failed to fetch transaction receipt: ${error.message}`);
    }
  }

  async reportTransaction(
    data: GenerateTransactionParams<FieldTypes>,
    txHashes: Array<{ hash: string; chainId: number }>,
  ): Promise<ErrorMessage> {
    const { formData, additionalData } = data;
    const { distributionToken } = formData;
    const iface = new Interface(MemeRedPacketABI);
    const eventTopic = ethers.id('RedPacketClaimed(uint256,address,uint256)');
    try {
      const receipt = await this.provider.getTransactionReceipt(
        txHashes[0].hash,
      );
      if (!receipt) {
        throw new Error('wrong transaction hash');
      }
      const log = receipt.logs.find((log) => {
        return log.topics[0] === eventTopic;
      });
      if (!log) {
        throw new Error('parse log error');
      }
      const event = iface.parseLog(log);
      const { amount } = event?.args ?? { amount: 0n };
      const decimals = await this.getDecimals(distributionToken);
      const claimedAmount = formatUnits(amount.toString(), decimals);
      const { account, code } = additionalData;
      if (!account) {
        throw new Error('missing account in reportTransaction params');
      }
      const userInfo = await this.dataService.getUserInfo(account);
      if (userInfo?.tgUserId) {
        this.logger.log(
          `Send message to tgUser: ${userInfo.tgUserId}, account: ${account}`,
        );
        const sharedLink = `${this.config.magicLinkUrl}/${code}?referrer=${account}`;
        await this.tgbotService.sendMemeRedPacketMsg(
          sharedLink,
          userInfo.tgUserId,
        );
      }
      return `You have received ${claimedAmount} in red packet amount!`;
    } catch (error) {
      throw new Error(`Failed to fetch transaction receipt: ${error.message}`);
    }
  }

  public async generateTransaction(
    data: GenerateTransactionParams<FieldTypes>,
  ): Promise<GenerateTransactionResponse> {
    const { additionalData } = data;
    const { code, account, inviter } = additionalData;
    if (!code) {
      throw new Error('missing code');
    }

    if (!account) {
      throw new Error('missing account');
    }

    const packetId = this.getPacketIDByCode(code);
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = await this.genClaimSignature({
      id: packetId,
      expiry,
      inviter: inviter ?? ethers.ZeroAddress,
      recipient: account,
    });
    const tx = await this.redPacketContract.claimRedPacket.populateTransaction(
      packetId,
      inviter ?? ethers.ZeroAddress,
      expiry,
      signature,
    );
    return {
      transactions: [
        {
          chainId: this.config.chainId,
          to: this.config.redPacketContractAddress,
          value: '0',
          data: tx.data,
          shouldPublishToChain: true,
        },
      ],
    };
  }

  private async getClaimedRecords(code: string, account?: string) {
    const result = await this.dataService.findRecordByCode(code, account);
    if (!result) {
      return [];
    }
    const packetId = this.getPacketIDByCode(code);
    const [, , token] = await this.redPacketContract.getRedPacketInfo(packetId);
    const transferInfos: TransactionResult[] = [];
    const intentionRecordTxs: IntentionRecordTx[] = result
      .map((r) => r.intentionRecordTxs)
      .flat();
    for (const recordTx of intentionRecordTxs) {
      if (recordTx.status !== IntentionRecordTxStatus.SUCCESS) {
        continue;
      }
      const transferInfo = await this.parseClaimEventLog(recordTx.txHash);

      const tokenData =
        token === ethers.ZeroAddress
          ? {
              symbol: 'ETH',
              decimals: 18,
            }
          : await getERC20SymbolAndDecimals(this.provider, token);
      transferInfos.push({
        recipient: transferInfo.recipient,
        symbol: tokenData.symbol,
        amount: formatUnits(transferInfo.amount, tokenData.decimals),
        txhash: recordTx.txHash,
        chainId: recordTx.chainId,
      });
    }
    return transferInfos;
  }

  public async reloadAdvancedInfo(
    data: BasicAdditionalParams,
  ): Promise<{ title: string; content: string }> {
    const { code, account } = data;
    if (!code) {
      throw new Error('missing code');
    }
    if (!account) {
      throw new Error('missing account');
    }

    const hash = keccak256(toUtf8Bytes(code));
    const packetId = getBigInt(hash);
    const [, unClaimedCount] =
      await this.redPacketContract.getRedPacketBalance(packetId);
    const [_, , , totalCount] =
      await this.redPacketContract.getRedPacketInfo(packetId);

    const claimRecords = await this.getClaimedRecords(code, account);
    const claimRecordsHtml = await this.generateHTML(claimRecords);
    return {
      title: 'Recipients',
      content: `${totalCount - unClaimedCount}/${totalCount} red packet(s) opened ${claimRecordsHtml}`,
    };
  }

  private async generateHTML(
    transactions: TransactionResult[],
  ): Promise<string> {
    return transactions
      .map((tx) => {
        const explorerUrl = this.chainService.buildTransactionExplorerLink(
          tx.txhash,
          this.config.chainId,
        );
        return `
          <br/>
          <br/>
          <div>
            <div>To: ${tx.recipient} </div>
            <div>Amount: ${tx.amount} ${tx.symbol} </div>
            <div>Transaction Hash: <a href=${explorerUrl}>${explorerUrl}</a><div>
          </div>
        `;
      })
      .join('');
  }

  public async generateManagementInfo(code: string) {
    const packetId = this.getPacketIDByCode(code);
    const magicLinkInfo = await this.dataService.getMagicLinkInfoByCode(code);

    if (!magicLinkInfo) {
      throw new Error(`magicLink ${code} not found`);
    }
    const distributionToken = magicLinkInfo.components.find(
      (i) => i.name === 'distributionToken',
    );

    if (!distributionToken) {
      throw new Error(`magicLink ${code} distributionToken not found`);
    }

    let symbol = 'ETH';
    let decimals = 18;

    if (distributionToken.value !== ethers.ZeroAddress) {
      const tokenData = await getERC20SymbolAndDecimals(
        this.provider,
        distributionToken.value,
      );
      symbol = tokenData.symbol;
      decimals = tokenData.decimals;
    }

    const withdrawRedPacketData =
      await this.redPacketContract.withdrawPacketBalance.populateTransaction(
        packetId,
      );

    const [, , , totalCount, tokenAmount] =
      await this.redPacketContract.getRedPacketInfo(packetId);

    const [, unClaimedCount, unClaimedTokenAmount] =
      await this.redPacketContract.getRedPacketBalance(packetId);

    const records = await this.getClaimedRecords(code);

    return {
      form: [
        {
          label: 'Number of Red Packets ',
          value: `${unClaimedCount}/${totalCount}`,
        },
        {
          label: 'Number of Tokens',
          value: `${formatUnits(unClaimedTokenAmount, decimals)}/${formatUnits(tokenAmount, decimals)} ${symbol}`,
        },
        {
          label: 'Winner List',
          value: records.map((i) => ({
            address: i.recipient,
            amount: `${i.amount} ${i.symbol}`,
          })),
        },
      ],
      triggers: [
        {
          text: 'Claim your token',
          transactions: [
            {
              chainId: Number(magicLinkInfo.network.chainId),
              to: this.config.redPacketContractAddress,
              value: '0',
              data: withdrawRedPacketData.data,
              customData: null,
              shouldPublishToChain: true,
            },
          ],
        },
      ],
    };
  }
}
