import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import html2md from 'html-to-md';
import { LRUCache } from 'lru-cache';
import { MoreThanOrEqual } from 'typeorm';

import { ChainService } from '@core/shared';
import TelegramBot, {
  ChatMemberUpdated,
  ParseMode,
} from 'node-telegram-bot-api';
import { NetworkDto } from 'src/common/dto';
import configFactory from 'src/config';
import { Chains } from 'src/constants';
import { BusinessException } from 'src/exception/business.exception';
import {
  CreatorRepository,
  IntentionRepository,
  TgGroupAndChannelRepository,
  TgMessageRepository,
} from 'src/repositories';
import { Settings } from 'src/types';

import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';
import { IntentionRecordService } from '../actionUrl/intentionRecord.service';
import { CoingeckoService } from '../coingecko/coingecko.service';

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
    private readonly coingeckoService: CoingeckoService,
    private readonly chainService: ChainService,
    private readonly tgMessageRepository: TgMessageRepository,
    private readonly tgGroupAndChannelRepository: TgGroupAndChannelRepository,
  ) {}

  async update(body: any) {
    this.logger.log('new messages:', JSON.stringify(body));
    this.bot.processUpdate(body);
  }

  async onModuleInit() {
    this.handleUpdateMagicNews();
    const config = await configFactory();
    const token = config.tgbot.token as string;
    const webHookUrl = config.tgbot.webHookUrl;
    this.bot = new TelegramBot(token);
    this.bot.setWebHook(webHookUrl);
    await this.eventInit();
  }

  async handleUpdateMagicNews() {
    const loop = true;
    while (loop) {
      try {
        this.logger.log('start updateMagicNews');
        await this.updateMagicNews();
        this.logger.log('end updateMagicNews');
      } catch (error) {
        this.logger.error(error);
      }
      await this.delay(60 * 1000);
    }
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async eventInit() {
    // this.bot.onText(/\/start/, (msg: any) => this.onStart(msg.from.id));
    this.bot.onText(/\/my/, (msg: any) => this.onMyMagicLink(msg.from.id));
    this.bot.onText(/Create/, (msg: any) => this.onCreate(msg.from.id));
    this.bot.onText(/Portfolio/, (msg: any) => this.onPortfolio(msg.from.id));
    this.bot.onText(/Support/, (msg: any) => this.onSupport(msg.from.id));
    this.bot.onText(/News/, (msg: any) => this.onNews(msg.from.id));
    this.bot.onText(/Invite/, (msg: any) => this.onInvite(msg.from.id));
    this.bot.onText(/Earn/, (msg: any) => this.onEarn(msg.from.id));
    this.bot.onText(/join_en/, (msg: any) => this.onJoin(msg, 'en'));
    this.bot.onText(/join_cn/, (msg: any) => this.onJoin(msg, 'cn'));
    this.bot.on('text', (msg: any) => {
      switch (msg.text) {
        case '/start':
          this.onStart(msg.from.id);
          break;
      }
    });

    this.bot.on('my_chat_member', (msg: ChatMemberUpdated) =>
      this.onMyChatMember(msg),
    );

    this.bot.on('callback_query', (callbackQuery: any) => {
      this.logger.log(`callback_query:`, JSON.stringify(callbackQuery));
      const chatId = callbackQuery.message.chat.id;
      const messageId = callbackQuery.message.message_id;
      const userId = callbackQuery.from.id;
      const data = callbackQuery.data;
      if (data == 'addbot_group') {
        this.onInviteReply(userId, chatId, messageId);
        return;
      }
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

  async onMyChatMember(msg: ChatMemberUpdated) {
    const config = await configFactory();
    const bot = config.tgbot.tgbot;
    this.logger.log(`onMyChatMember msg: ${JSON.stringify(msg)}, bot:${bot}`);
    const joinUser = msg.new_chat_member.user;
    const joinStatus = msg.new_chat_member.status;
    const from = msg.from;
    const lang = from.language_code == 'zh-hans' ? 'cn' : 'en';
    if (joinStatus != 'left' && joinUser.is_bot && joinUser.username == bot) {
      const tgGroupOrChannel = await this.tgGroupAndChannelRepository.findOneBy(
        {
          chatId: msg.chat.id.toString(),
        },
      );
      if (tgGroupOrChannel) {
        this.logger.log(
          'canNotAddBot, group or channel exist:',
          JSON.stringify(msg),
        );
        return;
      }
      await this.onJoin(msg, lang);
    }
  }

  async onJoin(msg: any, lang: string) {
    const chatId = msg.chat.id;
    const chatTitle = msg.chat.title ?? '';
    const chatType = msg.chat.type ?? '';
    const fromId = msg.from.id;
    const fromUsername = msg.from.username ?? '';
    const fromIsBot = msg.from.is_bot ? 1 : 0;
    const inviteDate = msg.date;
    const tgGroupAndChannel = {
      chatId,
      chatTitle,
      chatType,
      fromId,
      fromUsername,
      fromIsBot,
      inviteDate,
      lang,
    };
    try {
      await this.tgGroupAndChannelRepository.upsert(tgGroupAndChannel, true, [
        'chatId',
      ]);
    } catch (error) {
      this.logger.error('onJoin error', error.stack);
    }
  }

  async onStart(tgUserId: string) {
    const config = await configFactory();
    const userMiniApp = config.tgbot.userMiniApp;
    const aws3url = config.aws.s3Url;

    const photo = `${aws3url}/dev/tg/onstart.png`;
    // const photo = 'https://pic.imgdb.cn/item/66bb2b02d9c307b7e9c8ec19.png';
    //     const caption = `Welcome to magicLink\\! The magicLink TG Mini APP is a dedicated application under magicLink\\, specifically designed for the TG ecosystem\\.

    // 🔮 The app supports users in creating and managing magicLinks while providing essential interaction capabilities\\, enabling seamless connections with other magicLinks\\.

    // 💫 [*__Create__*](https://magic.zklink.io/dashboard/intent) magicLink & unlock potential to grab even more strategies with fun\\!

    // 🗞 [*__Follow__*](https://t.me/${config.tgbot.newsChannelIdEn}) up with Magic News to know the first\\-hand crypto message\\!

    // 💳 [*__Check__*](${userMiniApp}?startapp=portfolio) your Portfolio & Magic Account

    // 💰 [*__Deposit__*](${userMiniApp}?startapp=deposit) Crypto Assets to your Magic Account in multiple Chains including all EVM Chain\\, Solana\\, SUI and so on\\.

    // 🧠 Learn about magicLink with Magic Academy\\.

    // 🫂 [*__Invite__*](${userMiniApp}?startapp=invite) your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

    // ⛓ Manage magicLinks you create before\\.`;
    const caption = `Welcome to magicLink\\! The magicLink TG Mini APP is a dedicated application under magicLink\\, specifically designed for the TG ecosystem\\. 

🔮 The app supports users in creating and managing magicLinks while providing essential interaction capabilities\\, enabling seamless connections with other magicLinks\\.
    
💫 [*__Create__*](https://magic.zklink.io/dashboard/intent) magicLink & unlock potential to grab even more strategies with fun\\! 

🗞 [*__Follow__*](https://t.me/${config.tgbot.newsChannelIdEn}) up with Magic News to know the first\\-hand crypto message\\!

💳 Check your Portfolio & Magic Account 

💰 Deposit Crypto Assets to your Magic Account in multiple Chains including all EVM Chain\\, Solana\\, SUI and so on\\.

🧠 Learn about magicLink with Magic Academy\\.

🫂 [*__Invite__*](${userMiniApp}?startapp=invite) your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

⛓ Manage magicLinks you create before\\.`;
    // caption = this.formatMarkdownV2(caption);
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
    const text = `It's the start for your Magic Journey\\, choose a Topic and Create your own magicLink here\\!`;
    // text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '💫Create magicLink',
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
        const novaProvider = this.chainService.getProvider(Chains.ZkLinkNova);
        ethBalance = await novaProvider.getBalance(walletAddress);
      } catch (error) {
        this.logger.error(`onStart error`, error.stack);
      }
    }
    //     const text = `Manage and review your trading portfolio 💼

    // 💰 *My Wallet Address: \`${walletAddress ? walletAddress : 'You have not yet bind your Smart Account'}\`*
    // 🪙 *ETH balance: ${this.formatMarkdownV2(Number(ethers.formatEther(ethBalance)).toFixed(6))} ETH*

    //     Don't have ETH yet? Open your account and deposit from here 👇`;
    //     const reply_markup = {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: '📈View my Magic Account',
    //             url: `${userMiniApp}?startapp=portfolio`,
    //           },
    //         ],
    //       ],
    //     };
    const text = `Coming soon\\!`;
    const parse_mode: ParseMode = 'MarkdownV2';
    // const options = { reply_markup: reply_markup, parse_mode };
    const options = { parse_mode };
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
    const text = `Need a hand? Open a ticket in our Support Bot 🤝`;
    // text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '🤝Open magicLink Support Bot',
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
    const channelLinkCn = `https://t.me/${config.tgbot.newsChannelIdCn}`;
    const text = `Want to know first hand Crypto News? Follow up with our Magic News Channel\\!`;
    // text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Magic News Channel',
            url: channelLink,
          },
          {
            text: 'Magic News中文频道',
            url: channelLinkCn,
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
    const botLink = `https://t.me/${config.tgbot.tgbot}`;
    // const url = encodeURIComponent(botLink);

    //     const tgShareUrl = `https://t.me/share/url?url=${url}&text=💫 Join magicLink Telegram and enjoy lower transaction fees with my referral code.

    // 🔮The magicLink TG Mini APP is a dedicated application under magicLink, specifically designed for the TG ecosystem.

    // 🔮magicLink offers multi-chain wallet and asset management features, allowing users to quickly create and manage magicLinks across multiple chains, simplifying asset transfers and interactions.`;
    //     const text = `Invite your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

    // Current Invitee: 0
    // Share to More friends and groups here\\!`;
    const text = `Would you like to add the MagicLink bot to your group or channel \\?`;
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Group',
            callback_data: `addbot_group`,
          },
          {
            text: 'Channel',
            url: `${botLink}?startchannel=join&admin=post_messages`,
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

  async onInviteReply(tgUserId: string, chatId: string, messageId: string) {
    const config = await configFactory();
    const botLink = `https://t.me/${config.tgbot.tgbot}`;
    // const url = encodeURIComponent(botLink);

    //     const tgShareUrl = `https://t.me/share/url?url=${url}&text=💫 Join magicLink Telegram and enjoy lower transaction fees with my referral code.

    // 🔮The magicLink TG Mini APP is a dedicated application under magicLink, specifically designed for the TG ecosystem.

    // 🔮magicLink offers multi-chain wallet and asset management features, allowing users to quickly create and manage magicLinks across multiple chains, simplifying asset transfers and interactions.`;
    //     const text = `Invite your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

    // Current Invitee: 0
    // Share to More friends and groups here\\!`;
    const text = `Choose Language you want [@magicLink](${botLink}) Bot Speak\\!`;
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'English',
            url: `${botLink}?startgroup=join_en`,
          },
          {
            text: '中文',
            url: `${botLink}?startgroup=join_cn`,
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode };
    try {
      await this.bot.deleteMessage(chatId, Number(messageId));
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onInviteReply success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onInviteReply error`, error.stack);
    }
  }

  async onEarn(tgUserId: string) {
    const text = `Coming soon\\!`;
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
      where: { creator: { id: creator.id } },
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
      const shareUrl = encodeURIComponent(
        `${userMiniApp}?startapp=${intent.code}`,
      );
      caption += `
*${++count}*
*Title* : ${this.formatMarkdownV2(intent.title)}
*Description* : ${this.formatMarkdownV2(content)}
*Create Time* : ${date}
[Go to tg mini app](${userMiniApp}?startapp=${intent.code})              [Share to others](https://t.me/share/url?url=${shareUrl}&text=${intent.title})
\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n
        `;
    }
    const options = { parse_mode: 'MarkdownV2' as ParseMode };
    try {
      // caption = this.formatMarkdownV2(caption);
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
    const shareUrl = encodeURIComponent(
      `${userMiniApp}?startapp=${magicLink.code}`,
    );
    const caption = `
*Title* : ${this.formatMarkdownV2(magicLink.title)}
*Description* : ${this.formatMarkdownV2(content)}
*Create Time* : ${this.formatMarkdownV2(date)}
[Go to tg mini app](${userMiniApp}?startapp=${magicLink.code})              [Share to others](https://t.me/share/url?url=${shareUrl}&text=${magicLink.title})
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
        //url: `${userMiniApp}${action.href}&startapp=${magicLink.code}_${action.index}`,
        url: `${userMiniApp}${action.href}&startapp=${magicLink.code}`,
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
    // caption = this.formatMarkdownV2(caption);
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
    const tgbot = `https://t.me/${config.tgbot.tgbot}`;
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
        network: NetworkDto;
        components: {
          value: string;
          options?: {
            label?: string;
            value: string;
            default: boolean;
          }[];
        }[];
      };
    };
    const photo = news.metadata;
    const description = html2md(news.description.replaceAll(/<img[^>]*>/g, ''));
    // eslint-disable-next-line no-useless-escape
    const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const links: string[] = [];
    const content = description.replaceAll(markdownLinkPattern, (match) => {
      links.push(match);
      return '<<LINK<<';
    });
    const network = settings.intentInfo.network.name;
    const chainId = settings.intentInfo.network.chainId;
    const components = settings.intentInfo.components;
    const fromTokenAddress = this.getOptionsLabelFromValue(
      components[1].value,
      components[1].options ?? [],
    );
    const toTokenAddress = this.getOptionsLabelFromValue(
      components[2].value,
      components[2].options ?? [],
    );
    let fromObj = await this.getTokenInfo(Number(chainId), fromTokenAddress);
    if (!fromObj) {
      this.logger.error(
        `sendNews error : fromToken not exists. code:${code}, fromTokenAddress:${fromTokenAddress}`,
      );
      fromObj = { symbol: fromTokenAddress, usdPrice: '-' };
    }
    let toObj = await this.getTokenInfo(Number(chainId), toTokenAddress);
    if (!toObj) {
      this.logger.error(
        `sendNews error : toToken not exists. code:${code}, toTokenAddress:${toTokenAddress}`,
      );
      toObj = { symbol: toTokenAddress, usdPrice: '-' };
    }
    const participants = await this.intentionRecordService.countByCode(code);
    let captionTemplate = '';
    let linkIndex = 0;
    let lang = 'cn';
    if (this.containsChineseCharacters(content)) {
      newsChannelId = newsChannelIdCn;
      captionTemplate = `
      🟢*${this.formatMarkdownV2(news.title)}*🟢
      ${this.formatMarkdownV2(content).replaceAll(
        '<<LINK<<',
        () => links[linkIndex++],
      )}

👨‍🍳交易策略:

📍 ${this.formatMarkdownV2(network)}
➡️Token From: ${fromObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(fromObj?.usdPrice.toString())}*\\)
⬅️Token To: ${toObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(toObj?.usdPrice.toString())}*\\)
👥参与人数: $participants

🔥更多信息请到 👉magicLink TG \\([Go to mini app](${userMiniApp}?startapp=${news.code})\\)

🌈在您的群中推送 magicNews 邀请 [@magicLink](${tgbot}?startgroup=join_cn) 到您的群中
`;
    } else {
      lang = 'en';
      newsChannelId = newsChannelIdEn;
      captionTemplate = `
🟢*${this.formatMarkdownV2(news.title)}*🟢
${this.formatMarkdownV2(content).replaceAll(
  '<<LINK<<',
  () => links[linkIndex++],
)}

👨‍🍳Trading Strategy:

📍 ${this.formatMarkdownV2(network)}
➡️Token From: ${fromObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(fromObj?.usdPrice.toString())}*\\)
⬅️Token To: ${toObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(toObj?.usdPrice.toString())}*\\)
👥Participants: $participants

🔥More details Click here to 👉magicLink TG \\([Go to mini app](${userMiniApp}?startapp=${news.code})\\)

🌈Push Magic News Alerts in group? Invite [@magicLink](${tgbot}?startgroup=join_en) in your group
`;
    }

    const caption = captionTemplate.replaceAll(
      '$participants',
      participants.toString(),
    );
    // caption = captionTemplate;
    const parse_mode: ParseMode = 'MarkdownV2';

    const inlineKeyboard = [];
    const newsType = settings.newsType ?? '';
    let typeActions = [];
    if (newsType == 'poll') {
      typeActions = [
        {
          text: '👍Pump(0)',
          callback_data: `long_0_0_poll`,
        },
        {
          text: '👎Dump(0)',
          callback_data: `short_0_0_poll`,
        },
      ];
    } else {
      typeActions = [
        {
          text: '👍Support(0)',
          callback_data: `long_0_0_intent`,
        },
        {
          text: '👎Oppose(0)',
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
        // url: `${userMiniApp}${action.href}&startapp=${news.code}_${action.index}`,
        url: `${userMiniApp}${action.href}&startapp=${news.code}`,
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
    let res = null;
    const tgGroups = await this.tgGroupAndChannelRepository.find({
      select: ['chatId'],
      where: { lang },
      order: { inviteDate: 'ASC' },
    });
    const tgGroupIds = tgGroups.map((tgGroup) => tgGroup.chatId);
    tgGroupIds.push(newsChannelId);
    for (const tgGroupId of tgGroupIds) {
      try {
        if (photo === '') {
          const options = {
            reply_markup,
            parse_mode,
          };
          res = await this.bot.sendMessage(tgGroupId, caption, options);
        } else {
          const options = { reply_markup, parse_mode, caption };
          res = await this.bot.sendPhoto(tgGroupId, photo, options);
        }
        await this.bot.setMessageReaction(res.chat.id, res.message_id, {
          reaction: [{ type: 'emoji ', emoji: '👍' }],
          is_big: true,
        });
        const data = {
          messageId: res.message_id.toString(),
          chatId: res.chat.id.toString(),
          code: code,
          text: captionTemplate,
          replyMarkup: JSON.stringify(reply_markup),
          metadata: photo,
        };
        await this.tgMessageRepository.add(data);
        this.logger.log('sendNews success', JSON.stringify(res));
      } catch (error) {
        this.logger.error(
          `sendNews error,caption:${caption}, newsChannelId:${newsChannelId},error:`,
          error.stack,
        );
      }
    }
  }

  async sendNewsOrigin(
    title: string,
    description: string,
    metadata: string,
    fromTokenAddress: string,
    toTokenAddress: string,
    settings: Settings,
  ) {
    const config = await configFactory();
    const userMiniApp = config.tgbot.userMiniApp;
    const newsChannelIdCn = config.tgbot.newsChannelIdCn;
    const newsChannelIdEn = config.tgbot.newsChannelIdEn;
    let newsChannelId = '';
    const tgbot = `https://t.me/${config.tgbot.tgbot}`;
    const photo = metadata;
    description = html2md(description.replaceAll(/<img[^>]*>/g, ''));
    // eslint-disable-next-line no-useless-escape
    const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const links: string[] = [];
    const content = description.replaceAll(markdownLinkPattern, (match) => {
      links.push(match);
      return '<<LINK<<';
    });
    const network = settings.intentInfo.network.name;
    const chainId = settings.intentInfo.network.chainId;
    let fromObj = await this.getTokenInfo(Number(chainId), fromTokenAddress);
    if (!fromObj) {
      this.logger.error(
        `sendNews error : fromToken not exists. fromTokenAddress:${fromTokenAddress}`,
      );
      fromObj = { symbol: fromTokenAddress, usdPrice: '-' };
    }
    let toObj = await this.getTokenInfo(Number(chainId), toTokenAddress);
    if (!toObj) {
      this.logger.error(
        `sendNews error : toToken not exists. toTokenAddress:${toTokenAddress}`,
      );
      toObj = { symbol: toTokenAddress, usdPrice: '-' };
    }
    // const participants = await this.intentionRecordService.countByCode(code);
    let captionTemplate = '';
    let linkIndex = 0;
    let lang = 'cn';
    if (this.containsChineseCharacters(content)) {
      newsChannelId = newsChannelIdCn;
      captionTemplate = `
      🟢*${this.formatMarkdownV2(title)}*🟢
      ${this.formatMarkdownV2(content).replaceAll(
        '<<LINK<<',
        () => links[linkIndex++],
      )}

👨‍🍳交易策略:

📍 ${this.formatMarkdownV2(network)}
➡️Token From: ${fromObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(fromObj?.usdPrice.toString())}*\\)
⬅️Token To: ${toObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(toObj?.usdPrice.toString())}*\\)

🌈在您的群中推送 magicNews 邀请 [@magicLink](${tgbot}?startgroup=join_cn) 到您的群中
`;
    } else {
      lang = 'en';
      newsChannelId = newsChannelIdEn;
      captionTemplate = `
🟢*${this.formatMarkdownV2(title)}*🟢
${this.formatMarkdownV2(content).replaceAll(
  '<<LINK<<',
  () => links[linkIndex++],
)}

👨‍🍳Trading Strategy:

📍 ${this.formatMarkdownV2(network)}
➡️Token From: ${fromObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(fromObj?.usdPrice.toString())}*\\)
⬅️Token To: ${toObj?.symbol.toUpperCase()} \\(*$${this.formatMarkdownV2(toObj?.usdPrice.toString())}*\\)

🌈Push Magic News Alerts in group? Invite [@magicLink](${tgbot}?startgroup=join_en) in your group
`;
    }
    const caption = captionTemplate;
    const parse_mode: ParseMode = 'MarkdownV2';

    const inlineKeyboard = [];
    const newsType = settings.newsType ?? '';
    let typeActions = [];
    if (newsType == 'poll') {
      typeActions = [
        {
          text: '👍Pump(0)',
          callback_data: `long_0_0_poll`,
        },
        {
          text: '👎Dump(0)',
          callback_data: `short_0_0_poll`,
        },
      ];
    } else {
      typeActions = [
        {
          text: '👍Support(0)',
          callback_data: `long_0_0_intent`,
        },
        {
          text: '👎Oppose(0)',
          callback_data: `short_0_0_intent`,
        },
      ];
    }
    inlineKeyboard.push(typeActions);
    const actions = settings.intentList;
    for (let i = 0; i < actions.length; i++) {
      const lineButtons = [];
      for (let j = 0; j < actions[i].length; j++) {
        const action = actions[i][j];
        if (
          /^(https:\/\/|tg:\/\/)[^\s/$.?#].[^\s]*$/.test(action.value) == false
        ) {
          throw new BusinessException('Invalid action value, must be a url');
        }
        let url = '';
        if (
          action.value.includes('magic.zklink.io') ||
          action.value.includes('magic-test.zklink.io')
        ) {
          const urlTmp = new URL(action.value);
          const pathSegments = urlTmp.pathname.split('/');
          const code = pathSegments[pathSegments.length - 1];
          url = `${userMiniApp}?startapp=${code}_${action.btnIndex ?? ''}`;
        } else {
          url = action.value;
        }

        lineButtons.push({
          text: action.title,
          url: url,
        });
      }
      inlineKeyboard.push(lineButtons);
    }
    const reply_markup = {
      inline_keyboard: inlineKeyboard,
    };
    let res = null;
    const tgGroups = await this.tgGroupAndChannelRepository.find({
      select: ['chatId'],
      where: { lang },
      order: { inviteDate: 'ASC' },
    });
    const tgGroupIds = tgGroups.map((tgGroup) => tgGroup.chatId);
    tgGroupIds.push(newsChannelId);
    for (const tgGroupId of tgGroupIds) {
      try {
        if (photo === '') {
          const options = {
            reply_markup,
            parse_mode,
          };
          res = await this.bot.sendMessage(tgGroupId, caption, options);
        } else {
          const options = { reply_markup, parse_mode, caption };
          res = await this.bot.sendPhoto(tgGroupId, photo, options);
        }
        this.logger.log('sendNewsOrigin success', JSON.stringify(res));
      } catch (error) {
        this.logger.error(
          `sendNewsOrigin error,caption:${caption}, newsChannelId:${newsChannelId},error:`,
          error.stack,
        );
      }
    }
  }

  async sendMemeRedPacketMsg(inviteLink: string, tgUserId: string) {
    const caption = `
    ✅Your Meme Red Packet Already claimed\\.  Check your fortune\\!
    🧧 Share2Earn: Receive a 20% reward based on the value claimed by your invitees\\.
    Your Invite Link: \`${inviteLink}\`
    `;
    const parse_mode: ParseMode = 'MarkdownV2';
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=Claim your Meme Red Packet`;
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
    // caption = this.formatMarkdownV2(caption);
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
          text: `👍Pump(${long})`,
          callback_data: `long_${long}_${short}_poll`,
        },
        {
          text: `👎Dump(${short})`,
          callback_data: `short_${long}_${short}_poll`,
        },
      ];
    } else {
      inlineKeyboard[0] = [
        {
          text: `👍Support(${long})`,
          callback_data: `long_${long}_${short}_intent`,
        },
        {
          text: `👎Oppose(${short})`,
          callback_data: `short_${long}_${short}_intent`,
        },
      ];
    }

    try {
      const reply_markup = {
        inline_keyboard: inlineKeyboard,
      };
      await this.tgMessageRepository.update(
        { replyMarkup: JSON.stringify(reply_markup) },
        { chatId, messageId },
      );
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

  async updateMagicNews() {
    // update magic news participants which was sended in 24 hours
    const tgMessages = await this.tgMessageRepository.find({
      where: {
        createdAt: MoreThanOrEqual(new Date(Date.now() - 24 * 60 * 60 * 1000)),
      },
    });
    const codes = Array.from(
      new Set(tgMessages.map((tgMessage) => tgMessage.code)),
    );
    const countsByCode = await this.intentionRecordService.countByCodes(codes);
    tgMessages.forEach(async (tgMessage) => {
      const participants = countsByCode[tgMessage.code] ?? 0;
      const caption = tgMessage.text.replaceAll(
        '$participants',
        participants.toString(),
      );
      try {
        const options = {
          chat_id: tgMessage.chatId,
          message_id: Number(tgMessage.messageId),
          parse_mode: 'MarkdownV2' as ParseMode,
          reply_markup: JSON.parse(tgMessage.replyMarkup),
        };
        if (tgMessage.metadata) {
          await this.bot.editMessageCaption(caption, options);
        } else {
          await this.bot.editMessageText(caption, options);
        }
      } catch (error) {
        this.logger.log(
          `updateMagicNews error, chatId:${tgMessage.chatId}, messageId:${tgMessage.messageId}, error:`,
          error.message,
        );
      }
    });
  }

  formatMarkdownV2(text: string) {
    // '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
    return !text
      ? ''
      : text
          .replaceAll('.', '\\.')
          .replaceAll('-', '\\-')
          .replaceAll('*', '\\*')
          .replaceAll('[', '\\[')
          .replaceAll(']', '\\]')
          .replaceAll('~', '\\~')
          .replaceAll('`', '\\`')
          .replaceAll('>', '\\>')
          .replaceAll('+', '\\+')
          .replaceAll('|', '\\|')
          .replaceAll('{', '\\{')
          .replaceAll('}', '\\}')
          .replaceAll('?', '\\?')
          .replaceAll('!', '\\!')
          .replaceAll('#', '\\#')
          .replaceAll('=', '\\=')
          .replaceAll('(', '\\(')
          .replaceAll(')', '\\)');
  }

  containsChineseCharacters(str: string) {
    const regex = /[\u4e00-\u9fa5]/;
    return regex.test(str);
  }

  private getOptionsLabelFromValue(
    value: string,
    options: { label?: string; value: string; default: boolean }[],
  ) {
    if (options.length > 0) {
      for (const option of options) {
        if (option.value == value) {
          return option?.label ?? option.value;
        }
      }
    }
    return value;
  }

  private async getTokenInfo(chainId: number, tokenAddress: string) {
    const cgId = this.coingeckoService.transfChainidToCgid(chainId);
    if (!cgId) {
      return null;
    }
    const tokenInfo = await this.coingeckoService.getCoinDataByTokenAddress(
      cgId,
      tokenAddress,
    );
    return tokenInfo
      ? {
          symbol: tokenInfo.symbol,
          usdPrice: tokenInfo.market_data.current_price.usd,
        }
      : null;
  }
}
