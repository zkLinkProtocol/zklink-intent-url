import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import html2md from 'html-to-md';
import TelegramBot from 'node-telegram-bot-api';
import { ParseMode } from 'node-telegram-bot-api';

import configFactory from 'src/config';
import { CreatorRepository, IntentionRepository } from 'src/repositories';

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
  ) {}

  async update(body: any) {
    this.logger.log('new messages:', JSON.stringify(body));
    this.bot.processUpdate(body);
  }

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
    this.bot.on('callback_query', (callbackQuery: any) => {
      this.logger.log(`callback_query:`, JSON.stringify(callbackQuery));
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const data = callbackQuery.data;
      const replyMarkup = callbackQuery.message.reply_markup;
      const [longOrShort, originLong, originShort, pollOrIntent] =
        data.split('_');
      this.editMessageReplyMarkupPollText(
        chatId,
        messageId,
        longOrShort,
        pollOrIntent,
        originLong,
        originShort,
        replyMarkup,
      );
    });
  }

  async onStart(tgUserId: string) {
    const config = await configFactory();
    const miniapp = config.tgbot.miniApp;
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
            url: miniapp,
          },
        ],
        [
          {
            text: 'Create New MagicLink',
            url: `${miniapp}?start=redirect=create`,
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
    const userMiniApp = config.tgbot.userMiniApp;
    for (const intent of intentions) {
      // Y-m-d H:i:s
      const date =
        intent.createdAt?.toISOString().split('T')[0] +
        ` ${intent.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
      const shareUrl = `${userMiniApp}?startapp%3D${intent.code}`;
      caption += `
*${++count}*
*Title* : \`${intent.title}\`
*Metadata* : ${intent.metadata.replaceAll('.', '\\.')} 
*Description* : ${intent.description}
*Create Time* : ${date.replaceAll('-', '\\-')}
[Go to tg mini app](${userMiniApp}?startapp=${intent.code})              [Share to others](https://t.me/share?url=${shareUrl}&text=${intent.title})
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

  async sendNews(code: string) {
    const config = await configFactory();
    const newsChannelId = config.tgbot.newsChannelId;
    const userMiniApp = config.tgbot.userMiniApp;
    const news = await this.actionUrlService.findOneByCode(code);
    const settings = news.settings as {
      newsType: string;
    };
    const photo = news.metadata;
    const content = html2md(news.description.replaceAll(/<img[^>]*>/g, ''));
    const date =
      news.createdAt?.toISOString().split('T')[0] +
      ` ${news.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
    const caption = `
*Title* : \`${news.title}\`
*Description* : ${content}
*Create Time* : ${date.replaceAll('-', '\\-')}
[Go to mini app](${userMiniApp}?startapp=${news.code}) 
✅️ *Verified zkLink official team*
`;
    const parse_mode: ParseMode = 'MarkdownV2';
    const postHref = `${userMiniApp}?startapp=${news.code}&`;

    const inlineKeyboard = [];
    const newsType = settings.newsType ?? '';
    let typeActions = [];
    if (newsType == 'poll') {
      typeActions = [
        {
          text: 'Long(0)',
          callback_data: `long_0_0_poll`,
        },
        {
          text: 'Short(0)',
          callback_data: `short_0_0_poll`,
        },
      ];
    } else {
      typeActions = [
        {
          text: 'Support(0)',
          callback_data: `long_0_0_intent`,
        },
        {
          text: 'Oppose(0)',
          callback_data: `short_0_0_intent`,
        },
      ];
    }
    inlineKeyboard.push(typeActions);
    const actions = this.blinkService.magicLinkToBlinkActions(
      postHref,
      news.settings,
    );
    let lineButtons = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      lineButtons.push({
        text: action.label,
        url: action.href,
      });
      if ((i + 1) % 3 === 0) {
        inlineKeyboard.push(lineButtons);
        lineButtons = [];
      }
    }
    if (lineButtons.length > 0) {
      inlineKeyboard.push(lineButtons);
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
    } catch (error) {
      this.logger.error(`sendNews error`, error.stack);
    }
  }

  async editMessageReplyMarkupPollText(
    chatId: string,
    messageId: string,
    longOrShort: string,
    pollOrIntent: string,
    long: number,
    short: number,
    replyMarkup: any,
  ) {
    if (longOrShort === 'long') {
      long++;
    } else if (longOrShort === 'short') {
      short++;
    }
    const inlineKeyboard = replyMarkup.inline_keyboard;
    if (pollOrIntent == 'poll') {
      inlineKeyboard[0] = [
        {
          text: `Long(${long})`,
          callback_data: `long_${long}_${short}_poll`,
        },
        {
          text: `Short(${short})`,
          callback_data: `short_${long}_${short}_poll`,
        },
      ];
    } else {
      inlineKeyboard[0] = [
        {
          text: `Support(${long})`,
          callback_data: `long_${long}_${short}_intent`,
        },
        {
          text: `Oppose(${short})`,
          callback_data: `short_${long}_${short}_intent`,
        },
      ];
    }

    try {
      const reply_markup = {
        inline_keyboard: inlineKeyboard,
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
