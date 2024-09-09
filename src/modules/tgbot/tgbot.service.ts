import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import TelegramBot from 'node-telegram-bot-api';
import { ParseMode } from 'node-telegram-bot-api';

import configFactory from 'src/config';
import { CreatorRepository, IntentionRepository } from 'src/repositories';

@Injectable()
export class TgbotService implements OnModuleInit {
  private logger: Logger = new Logger(TgbotService.name);
  private bot: TelegramBot;

  constructor(
    private readonly intentionRepository: IntentionRepository,
    private readonly creatorRepository: CreatorRepository,
  ) {}

  async onModuleInit() {
    const config = await configFactory();
    const token = config.tgbot.token as string;
    const webHookUrl = config.tgbot.webHookUrl;
    this.bot = new TelegramBot(token);
    this.bot.setWebHook(webHookUrl);
    await this.eventInit();
  }

  private async eventInit() {
    this.bot.onText(/\/start/, (msg: any) => this.onStart(msg.from.id));
    this.bot.onText(/\/my/, (msg: any) => this.onMyMagicLink(msg.from.id));
  }

  async onStart(tgUserId: string) {
    const config = await configFactory();
    const minapp = config.tgbot.miniApp;
    const creator = await this.creatorRepository.findOneBy({ tgUserId });
    let walletAddress = '';
    let ethBalance = BigInt(0);
    if (creator) {
      walletAddress = creator.address;
      try {
        const novaRpc = config.rpc[810180];
        const novaProvider = new ethers.JsonRpcProvider(novaRpc);
        ethBalance = await novaProvider.getBalance(walletAddress);
      } catch (error) {
        this.logger.error(`onStart error`, error);
      }
    }
    const photo = 'https://pic.imgdb.cn/item/66bb2b02d9c307b7e9c8ec19.png';
    let caption = `The Magic Link TG Mini APP is a dedicated application under Magic Link, specifically designed for the TG ecosystem. 
    It offers multi-chain wallet and asset management features, allowing users to quickly create and manage Magic Links across multiple chains, simplifying asset transfers and interactions.     
    The app supports users in creating and managing Magic Links while providing essential interaction capabilities, enabling seamless connections with other Magic Links.
    
    💰 My Wallet Address: \`${walletAddress}\`
    
    ETH balance in Nova: ${Number(ethers.formatEther(ethBalance)).toFixed(6)} ETH
    
    Don't have ETH yet? Open your account and deposit from here 👇`;
    caption = caption.replaceAll('.', '\\.').replaceAll('-', '\\-');
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Twitter',
            url: 'https://x.com/zkLinkNova',
          },
          {
            text: 'Community',
            url: 'https://t.me/zkLinkorg',
          },
        ],
        [
          {
            text: 'Open MagicLink Page',
            url: minapp,
          },
        ],
        [
          {
            text: 'Create New MagicLink',
            url: `${minapp}?start=new`,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode, caption };
    console.log(tgUserId, photo, options);
    try {
      const res = await this.bot.sendPhoto(tgUserId, photo, options);
      console.log('onStart success', res);
    } catch (error) {
      console.error(`onStart error`, error);
    }
  }

  async onMyMagicLink(tgUserId: string) {
    const creator = await this.creatorRepository.findOneBy({ tgUserId });
    if (!creator) {
      console.log(tgUserId, creator);
      this.bot.sendMessage(tgUserId, 'You are not a creator');
      return;
    }
    const intentions = await this.intentionRepository.find({
      where: { creatorId: creator.id },
      order: { createdAt: 'DESC' },
    });
    if (!intentions || intentions.length === 0) {
      console.log(tgUserId, intentions);
      this.bot.sendMessage(tgUserId, 'You have no intentions');
      return;
    }
    let caption = '';
    let count = 0;
    const config = await configFactory();
    const miniApp = config.tgbot.miniApp;
    for (const intent of intentions) {
      // Y-m-d H:i:s
      const date =
        intent.createdAt?.toISOString().split('T')[0] +
        ` ${intent.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
      const shareUrl = `${miniApp}?startapp%3D${intent.code}`;
      caption += `
*${++count}*
*Title* : \`${intent.title}\`
*Metadata* : ${intent.metadata.replaceAll('.', '\\.')} 
*Description* : ${intent.description}
*Create Time* : ${date.replaceAll('-', '\\-')}
*Participant* : 0 
[Go to tg mini app](${miniApp}?startapp=${intent.code})              [Share to others](https://t.me/share?url=${shareUrl}&text=${intent.title})
✅️ *Verified zkLink official team*
\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n
        `;
    }
    const options = { parse_mode: 'MarkdownV2' as ParseMode };
    console.log(tgUserId, caption, options);
    try {
      const res = await this.bot.sendMessage(tgUserId, caption, options);
      console.log('onMyMagicLink success', res);
    } catch (error) {
      console.error('onMyMagicLink error', error);
    }
  }

  async handleBlink(chatId: string, domain: string, url: string) {
    const actionsJson = `${domain}/actions.json`;
    const actions = await fetch(actionsJson).then((res) => res.json());
    console.log('handleBlink');
  }

  async update(body: any) {
    console.log(body);
    this.bot.processUpdate(body);
  }
}
