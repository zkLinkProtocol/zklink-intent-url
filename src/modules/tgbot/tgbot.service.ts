import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import html2md from 'html-to-md';
import { LRUCache } from 'lru-cache';
import TelegramBot, { ParseMode } from 'node-telegram-bot-api';

import configFactory from 'src/config';
import { CreatorRepository, IntentionRepository } from 'src/repositories';

import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';
import { IntentionRecordService } from '../actionUrl/intentionRecord.service';

const options = {
  max: 240 * 7 * 10000,
};

const cache = new LRUCache<string, string>(options);

@Injectable()
export class TgbotService implements OnModuleInit {
  private logger: Logger = new Logger(TgbotService.name);
  private bot: TelegramBot;

  constructor(
    private readonly intentionRepository: IntentionRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly actionUrlService: ActionUrlService,
    private readonly blinkService: BlinkService,
    private readonly intentionRecordService: IntentionRecordService,
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
    this.bot.onText(/Create/, (msg: any) => this.onCreate(msg.from.id));
    this.bot.onText(/Portfolio/, (msg: any) => this.onPortfolio(msg.from.id));
    this.bot.onText(/Support/, (msg: any) => this.onSupport(msg.from.id));
    this.bot.onText(/News/, (msg: any) => this.onNews(msg.from.id));
    this.bot.onText(/Invite/, (msg: any) => this.onInvite(msg.from.id));
    this.bot.onText(/Earn/, (msg: any) => this.onEarn(msg.from.id));
    this.bot.on('callback_query', (callbackQuery: any) => {
      this.logger.log(`callback_query:`, JSON.stringify(callbackQuery));
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const userId = callbackQuery.from.id;
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
        userId,
      );
    });
  }

  async onStart(tgUserId: string) {
    const config = await configFactory();
    const userMiniApp = config.tgbot.userMiniApp;
    const aws3url = config.aws.s3Url;

    const photo = `${aws3url}/dev/tg/onstart.png`;
    // const photo = 'https://pic.imgdb.cn/item/66bb2b02d9c307b7e9c8ec19.png';
    let caption = `Welcome to Magic Link! The Magic Link TG Mini APP is a dedicated application under Magic Link, specifically designed for the TG ecosystem. 

🔮 The app supports users in creating and managing Magic Links while providing essential interaction capabilities, enabling seamless connections with other Magic Links.
    
💫 [*__Create__*](https://magic.zklink.io/dashboard/intent) Magic Link & unlock potential to grab even more strategies with fun! 

🗞 [*__Follow__*](https://t.me/${config.tgbot.newsChannelIdEn}) up with Magic News to know the first-hand crypto message!

💳 [*__Check__*](${userMiniApp}?startapp=portfolio) your Portfolio & Magic Account 

💰 [*__Deposit__*](${userMiniApp}?startapp=deposit) Crypto Assets to your Magic Account in multiple Chains including all EVM Chain, Solana, SUI and so on.

🧠 Learn about MagicLink with Magic Academy.

🫂 [*__Invite__*](${userMiniApp}?startapp=invite) your friends to Magic Link to get part of their transaction fees and earn extra rewards.

⛓ Manage MagicLinks you create before.`;
    caption = this.formatMarkdownV2(caption);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      is_persistent: true,
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: '💫Create',
          },
          {
            text: '📈Portfolio',
          },
        ],
        [
          {
            text: '🙋Support',
          },
          {
            text: '🐤News',
          },
        ],
        [
          {
            text: '✅Invite',
          },
          {
            text: '🌱Earn',
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

  async onCreate(tgUserId: string) {
    const config = await configFactory();
    const miniapp = config.tgbot.miniApp;
    let text = `It's the start for your Magic Journey, choose a Topic and Create your own Magic Link here!`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '💫Create Magic Link',
            url: `https://magic.zklink.io/dashboard/intent`,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onCreate success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onCreate error`, error.stack);
    }
  }

  async onPortfolio(tgUserId: string) {
    const config = await configFactory();
    const userMiniApp = config.tgbot.userMiniApp;
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
    let text = `Manage and review your trading portfolio 💼

💰 *My Wallet Address: \`${walletAddress ? walletAddress : 'You have not yet bind your Smart Account'}\`*
🪙 *ETH balance: ${Number(ethers.formatEther(ethBalance)).toFixed(6)} ETH*
        
    Don't have ETH yet? Open your account and deposit from here 👇`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '📈View my Magic Account',
            url: `${userMiniApp}?startapp=portfolio`,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onPortfolio success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onPortfolio error`, error.stack);
    }
  }

  async onSupport(tgUserId: string) {
    const config = await configFactory();
    const supportLink = config.tgbot.supportLink;
    let text = `Need a hand? Open a ticket in our Support Bot 🤝`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '🤝Open MagicLink Support Bot',
            url: supportLink,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onSupport success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onSupport error`, error.stack);
    }
  }

  async onNews(tgUserId: string) {
    const config = await configFactory();
    const channelLink = `https://t.me/${config.tgbot.newsChannelIdEn}`;
    let text = `Want to know first hand Crypto News? Follow up with our Magic News Channel!`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Open Magic News Channel',
            url: channelLink,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onNews success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onNews error`, error.stack);
    }
  }

  async onInvite(tgUserId: string) {
    const config = await configFactory();
    const url = config.tgbot.tgbot;
    const tgShareUrl = `tg://msg_url?url=${url}&text=💫 Join MagicLink Telegram and enjoy lower transaction fees with my referral code.

🔮The Magic Link TG Mini APP is a dedicated application under Magic Link, specifically designed for the TG ecosystem. 

🔮Magic Link offers multi-chain wallet and asset management features, allowing users to quickly create and manage Magic Links across multiple chains, simplifying asset transfers and interactions.`;
    let text = `Invite your friends to Magic Link to get part of their transaction fees and earn extra rewards.

Current Invitee: 0
Share to More friends and groups here!`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Share',
            url: tgShareUrl,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onInvite success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onInvite error`, error.stack);
    }
  }

  async onEarn(tgUserId: string) {
    let text = `Coming soon!`;
    text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const options = { parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onEarn success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onEarn error`, error.stack);
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
      const content = html2md(intent.description.replaceAll(/<img[^>]*>/g, ''));
      // Y-m-d H:i:s
      const date =
        intent.createdAt?.toISOString().split('T')[0] +
        ` ${intent.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
      const shareUrl = `${userMiniApp}?startapp%3D${intent.code}`;
      caption += `
*${++count}*
*Title* : ${intent.title}
*Description* : ${content}
*Create Time* : ${date}
[Go to tg mini app](${userMiniApp}?startapp=${intent.code})              [Share to others](tg://msg_url?url=${shareUrl}&text=${intent.title})
\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n
        `;
    }
    const options = { parse_mode: 'MarkdownV2' as ParseMode };
    try {
      caption = this.formatMarkdownV2(caption);
      const res = await this.bot.sendMessage(tgUserId, caption, options);
      this.logger.log('onMyMagicLink success', JSON.stringify(res));
    } catch (error) {
      this.logger.error('onMyMagicLink error', error.stack);
    }
  }

  async sendMagicLink(code: string) {
    const config = await configFactory();
    const userMiniApp = config.tgbot.userMiniApp;
    const alertChannelId = config.tgbot.alertChannelId;
    let magicLink = null;
    try {
      magicLink = await this.actionUrlService.findOneByCode(code);
    } catch (error) {
      this.logger.error('sendMagicLink error', error.stack);
      return false;
    }
    if (!magicLink) {
      this.logger.error('sendMagicLink error : magicLink is undefined');
      return false;
    }
    const photo = magicLink.metadata;
    const content = html2md(
      magicLink.description.replaceAll(/<img[^>]*>/g, ''),
    );
    const date =
      magicLink.createdAt?.toISOString().split('T')[0] +
      ` ${magicLink.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
    const shareUrl = `${userMiniApp}?startapp%3D${magicLink.code}`;
    let caption = `
*Title* : ${magicLink.title}
*Description* : ${content}
*Create Time* : ${date}
[Go to tg mini app](${userMiniApp}?startapp=${magicLink.code})              [Share to others](tg://msg_url?url=${shareUrl}&text=${magicLink.title})
        `;
    const actions = this.blinkService.magicLinkToBlinkActions(
      '',
      magicLink.settings,
    );
    let lineButtons = [];
    const inlineKeyboard = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      lineButtons.push({
        text: action.label,
        url: `${userMiniApp}${action.href}&startapp=${magicLink.code}__________${action.index}`,
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
    caption = this.formatMarkdownV2(caption);
    const parse_mode: ParseMode = 'MarkdownV2';
    try {
      let res = null;
      if (photo === '') {
        const options = { reply_markup, parse_mode };
        res = await this.bot.sendMessage(alertChannelId, caption, options);
      } else {
        const options = { reply_markup, parse_mode, caption };
        res = await this.bot.sendPhoto(alertChannelId, photo, options);
      }
      this.logger.log('sendMagicLink success', JSON.stringify(res));
    } catch (error) {
      this.logger.error(`sendMagicLink error`, error.stack);
      this.logger.log(`caption:${caption}, alertChannelId:${alertChannelId}`);
    }
  }

  async sendNews(code: string) {
    const config = await configFactory();
    const newsChannelIdCn = config.tgbot.newsChannelIdCn;
    const newsChannelIdEn = config.tgbot.newsChannelIdEn;
    let newsChannelId = '';
    const userMiniApp = config.tgbot.userMiniApp;
    const tgbot = config.tgbot.tgbot;
    let news = null;
    try {
      news = await this.actionUrlService.findOneByCode(code);
    } catch (error) {
      this.logger.error('sendNews error', error.stack);
      return false;
    }
    if (!news) {
      this.logger.error('sendNews error : news is undefined');
      return false;
    }
    const settings = news.settings as {
      newsType: string;
      intentInfo: {
        network: {
          name: string;
        };
        components: {
          value: string;
          options?: {
            label: string;
            value: string;
            default: boolean;
          }[];
        }[];
      };
    };
    const photo = news.metadata;
    const content = html2md(news.description.replaceAll(/<img[^>]*>/g, ''));
    const date =
      news.createdAt?.toISOString().split('T')[0] +
      ` ${news.createdAt?.toISOString().split('T')[1].split('.')[0]}`;
    const network = settings.intentInfo.network.name;
    const components = settings.intentInfo.components;
    const from = this.getOptionsLabelFromValue(
      components[1].value,
      components[1].options ?? [],
    );
    const to = this.getOptionsLabelFromValue(
      components[2].value,
      components[2].options ?? [],
    );
    const participants = await this.intentionRecordService.countByCode(code);
    const captionTemplate = `
🟢*${news.title.replaceAll('(', '\\(').replaceAll(')', '\\)')}*🟢
${content.replaceAll('(', '\\(').replaceAll(')', '\\)')}

👨‍🍳Trading Strategy: 

📍 ${network}
➡️ Token From: ${from}
⬅️ Token To: ${to}
👥 Participants: $participants

🔥More details Click here to 👉MagicLink TG \\([Go to mini app](${userMiniApp}?startapp=${news.code})\\)

🌈Push Magic News Alerts in group? Invite [@BOT](${tgbot}?startgroup=join&admin=edit_messages) in your group
`;
    let caption = captionTemplate.replaceAll(
      '$participants',
      participants.toString(),
    );
    if (this.containsChineseCharacters(caption)) {
      newsChannelId = newsChannelIdCn;
    } else {
      newsChannelId = newsChannelIdEn;
    }
    const parse_mode: ParseMode = 'MarkdownV2';

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
      '',
      news.settings,
    );
    let lineButtons = [];
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      lineButtons.push({
        text: action.label,
        url: `${userMiniApp}${action.href}&startapp=${news.code}__________${action.index}`,
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
    caption = this.formatMarkdownV2(caption);
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
      this.logger.log(`caption:${caption}, newsChannelId:${newsChannelId}`);
    }
  }

  async sendMemeRedPacketMsg(inviteLink: string, tgUserId: string) {
    let caption = `
    ✅Your Meme Red Packet Already claimed.  Check your fortune!
    🧧 Share2Earn: Receive a 20% reward based on the value claimed by your invitees.
    Your Invite Link: \`${inviteLink}\`
    `;
    const parse_mode: ParseMode = 'MarkdownV2';
    const shareUrl = `tg://msg_url?url=${inviteLink}&text=Claim your Meme Red Packet`;
    const inlineKeyboard = [];
    inlineKeyboard.push([
      {
        text: 'Invite',
        url: shareUrl,
      },
    ]);
    const reply_markup = {
      inline_keyboard: inlineKeyboard,
    };
    caption = this.formatMarkdownV2(caption);
    try {
      const options = { reply_markup, parse_mode };
      const res = await this.bot.sendMessage(tgUserId, caption, options);
      this.logger.log('sendMemeRedPacketMsg success', JSON.stringify(res));
    } catch (error) {
      this.logger.error(`sendMemeRedPacketMsg error`, error.stack);
      this.logger.log(`tgUserId:${tgUserId}, caption:${caption}`);
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
    userId: string,
  ) {
    const cacheId = `${chatId}_${messageId}_${userId}`;
    if (cache.get(cacheId)) {
      return;
    }
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
      cache.set(cacheId, '1');
    } catch (error) {
      this.logger.error('editMessageReplyMarkupPollText error', error.stack);
    }
  }

  async updateMagicNews(code: string) {
    // this.bot.editMessageCaption(caption, {
    //   inline_message_id: inlinkMessageId,
    // });
  }

  async insertMagicNews(
    code: string,
    inlinkMessageId: string,
    caption: string,
  ) {}

  formatMarkdownV2(text: string) {
    return text
      .replaceAll('.', '\\.')
      .replaceAll('-', '\\-')
      .replaceAll('?', '\\?')
      .replaceAll('!', '\\!')
      .replaceAll('#', '\\#')
      .replaceAll('=', '\\=');
  }

  containsChineseCharacters(str: string) {
    const regex = /[\u4e00-\u9fa5]/;
    return regex.test(str);
  }

  private getOptionsLabelFromValue(
    value: string,
    options: { label: string; value: string; default: boolean }[],
  ) {
    if (options.length > 0) {
      for (const option of options) {
        if (option.value == value) {
          return option.label;
        }
      }
    }
    return value;
  }
}
