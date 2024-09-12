import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import html2md from 'html-to-md';
import TelegramBot from 'node-telegram-bot-api';
import { ParseMode } from 'node-telegram-bot-api';

import configFactory from 'src/config';
import {
  CreatorRepository,
  IntentionRepository,
  MessagePollRepository,
} from 'src/repositories';

import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';

@Injectable()
export class TgbotService implements OnModuleInit {
  private logger: Logger = new Logger(TgbotService.name);
  private bot: TelegramBot;

  constructor(
    private readonly intentionRepository: IntentionRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly actionUrlService: ActionUrlService,
    private readonly blinkService: BlinkService,
    private readonly messagePollRepository: MessagePollRepository,
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
    const tgbot = config.tgbot.tgbot;
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
        this.logger.error(`onStart error`, error.stack);
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
        [
          {
            text: 'Add to my group',
            url: `${tgbot}?startgroup=join&admin=edit_messages`,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode, caption };
    try {
      const res = await this.bot.sendPhoto(tgUserId, photo, options);
      this.logger.log(`onStart success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onStart error`, error.stack);
    }
  }

  async onMyMagicLink(tgUserId: string) {
    const creator = await this.creatorRepository.findOneBy({ tgUserId });
    if (!creator) {
      this.bot.sendMessage(tgUserId, 'You are not a creator');
      return;
    }
    const intentions = await this.intentionRepository.find({
      where: { creatorId: creator.id },
      order: { createdAt: 'DESC' },
    });
    if (!intentions || intentions.length === 0) {
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
    try {
      const res = await this.bot.sendMessage(tgUserId, caption, options);
      this.logger.log('onMyMagicLink success', JSON.stringify(res));
    } catch (error) {
      this.logger.error('onMyMagicLink error', error.stack);
    }
  }

  async update(body: any) {
    this.logger.log('new messages:', JSON.stringify(body));
    this.bot.processUpdate(body);
  }

  async sendNews(code: string) {
    const config = await configFactory();
    const newsChannelId = config.tgbot.newsChannelId;
    const miniApp = config.tgbot.miniApp;
    const pollApi = config.tgbot.pollApi;
    const news = await this.actionUrlService.findOneByCode(code);
    const settings = news.settings as {
      newsType: string;
    };
    const photo = news.metadata;
    const caption = html2md(news.description.replaceAll(/<img[^>]*>/g, ''));
    const parse_mode: ParseMode = 'MarkdownV2';
    const postHref = `${miniApp}`;

    const inlineKeyboard = [];
    const newsType = settings.newsType ?? '';
    if (newsType == 'poll') {
      const actions = [
        {
          text: 'Long(0)',
          url: `${pollApi}?chatId=&messageId=&longOrShort=long`,
        },
        {
          text: 'Short(0)',
          url: `${pollApi}?chatId=&messageId=&longOrShort=short`,
        },
      ];
      inlineKeyboard.push(actions);
    } else {
      const actions = this.blinkService.magicLinkToBlinkActions(
        postHref,
        news.settings,
      );
      let lineButtons = [];
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        lineButtons.push({
          text: action.label,
          url: action.href + `&startapp=${code}`,
        });
        if ((i + 1) % 3 === 0) {
          inlineKeyboard.push(lineButtons);
          lineButtons = [];
        }
      }
    }
    const reply_markup = {
      inline_keyboard: inlineKeyboard,
    };
    try {
      let res = null;
      if (photo === '') {
        const options = { reply_markup, parse_mode };
        res = await this.bot.sendMessage(newsChannelId, caption, options);
      } else {
        const options = { reply_markup, parse_mode, caption };
        res = await this.bot.sendPhoto(newsChannelId, photo, options);
      }
      this.logger.log('sendNews success', JSON.stringify(res));
      if (newsType == 'poll') {
        const chatId = res.chat.id;
        const messageId = res.message_id;
        await this.messagePollRepository.add({
          chatId: '' + chatId,
          messageId: '' + messageId,
          long: 0,
          short: 0,
        });
        await this.editMessageReplyMarkupPollText('' + chatId, '' + messageId);
      }
    } catch (error) {
      this.logger.error(`sendNews error`, error.stack);
    }
  }

  async editMessageReplyMarkupPollText(
    chatId: string,
    messageId: string,
    longOrShort: string = '',
  ) {
    const config = await configFactory();
    const pollApi = config.tgbot.pollApi;
    let long = 0;
    let short = 0;
    const message = await this.messagePollRepository.findOneBy({
      chatId,
      messageId,
    });
    if (!message) {
      return;
    }
    long = message.long;
    short = message.short;

    if (longOrShort != '') {
      if (longOrShort === 'long') {
        long++;
      } else if (longOrShort === 'short') {
        short++;
      }
      await this.messagePollRepository.update(
        { long, short },
        { chatId, messageId },
      );
    }

    try {
      const reply_markup = {
        inline_keyboard: [
          [
            {
              text: `Long(${long})`,
              url: `${pollApi}?chatId=${chatId}&messageId=${messageId}&longOrShort=long`,
            },
            {
              text: `Short(${short})`,
              url: `${pollApi}?chatId=${chatId}&messageId=${messageId}&longOrShort=short`,
            },
          ],
        ],
      };
      const res = await this.bot.editMessageReplyMarkup(reply_markup, {
        chat_id: chatId,
        message_id: Number(messageId),
      });
      this.logger.log(
        `editMessageReplyMarkupPollText success`,
        JSON.stringify(res),
      );
    } catch (error) {
      this.logger.error('editMessageReplyMarkupPollText error', error.stack);
    }
  }
}
