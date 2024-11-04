import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import html2md from 'html-to-md';
import { LRUCache } from 'lru-cache';
import TelegramBot, {
  ChatMemberUpdated,
  ParseMode,
} from 'node-telegram-bot-api';
import { MoreThanOrEqual } from 'typeorm';

import { NetworkDto } from 'src/common/dto';
import configFactory from 'src/config';
import { TgGroupAndChannel } from 'src/entities/tgGroupAndChannel.entity';
import { BusinessException } from 'src/exception/business.exception';
import {
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
export class FlashNewsBotService implements OnModuleInit {
  private logger: Logger = new Logger(FlashNewsBotService.name);
  private bot: TelegramBot;

  constructor(
    private readonly actionUrlService: ActionUrlService,
    private readonly blinkService: BlinkService,
    private readonly intentionRecordService: IntentionRecordService,
    private readonly coingeckoService: CoingeckoService,
    private readonly tgMessageRepository: TgMessageRepository,
    private readonly tgGroupAndChannelRepository: TgGroupAndChannelRepository,
  ) {}

  async update(body: any) {
    this.logger.log('new flashnews messages:', JSON.stringify(body));
    this.bot.processUpdate(body);
  }

  async onModuleInit() {
    this.handleUpdateFlashNews();
    const config = await configFactory();
    const token = config.tgbot.flashnewsbotToken as string;
    const webHookUrl = config.tgbot.flashnewsbotWebHookUrl;
    this.bot = new TelegramBot(token);
    this.bot.setWebHook(webHookUrl);
    await this.eventInit();
  }

  async handleUpdateFlashNews() {
    const loop = true;
    while (loop) {
      try {
        this.logger.log('start updateFlashNews.');
        await this.updateFlashNews();
        this.logger.log('end updateFlashNews.');
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
    this.bot.onText(/Invite/, (msg: any) => this.onInvite(msg.from.id));
    this.bot.onText(/join_en/, (msg: any) => this.onJoin(msg, 'en'));
    this.bot.onText(/join_cn/, (msg: any) => this.onJoin(msg, 'cn'));

    this.bot.on('text', async (msg: any) => {
      const config = await configFactory();
      const flashnewsbot = config.tgbot.flashnewsbot;
      if (msg.text == '/start') {
        this.onStart(msg.from.id);
      } else if (msg.text.includes(`@${flashnewsbot}`)) {
        await this.onGroupChat(msg);
      }
    });

    this.bot.on('my_chat_member', (msg: ChatMemberUpdated) =>
      this.onMyChatMember(msg),
    );

    this.bot.on('callback_query', (callbackQuery: any) => {
      this.logger.log(`callback_query`, JSON.stringify(callbackQuery));
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

  async onGroupChat(msg: any) {
    const config = await configFactory();
    const flashnewsbot = config.tgbot.flashnewsbot;
    const params = msg.text.split(' ');
    if (params.length == 2 && params[0] == `@${flashnewsbot}`) {
      const address = params[1];
      if (!ethers.isAddress(address)) {
        this.logger.log(
          `updateCommissionAddress error, chatId:${msg.chat.id}, fromId:${msg.from.id}, Invalid address: ${address}`,
        );
        const errorText = `Invalid address: ${address}`;
        await this.bot.sendMessage(msg.chat.id, errorText, {
          reply_to_message_id: msg.message_id,
          parse_mode: 'MarkdownV2',
        });
        return;
      }
      const res = await this.updateCommissionAddress(
        msg.chat.id.toString(),
        address,
        msg.from.id.toString(),
        msg.from.username,
      );
      let text = '';
      if (res.code == 2) {
        text = `👏Congrats\\! Your address already been added\\! 
It will be valid in 24H\\. Other group member can send \`@${this.formatMarkdownV2(flashnewsbot)} 0xx\\.\\.xxx\` to be new inviter after 24H\\.
[@${this.formatMarkdownV2(msg.from.username)}](tg://user?id=${msg.from.id})`;
      } else if (res.code == 1) {
        // faild, address time is not expired
        const now = Date.now();
        const differenceInSeconds = Math.floor((Number(res.data) - now) / 1000);
        const humanized = this.humanizeTimeDifference(differenceInSeconds);
        text = `Sorry\\! Commission address is not expired\\! Please wait for ${humanized.humanized}\\.
[@${this.formatMarkdownV2(msg.from.username)}](tg://user?id=${msg.from.id})`;
      } else {
        const flashNewsBotLink = `https://t.me/${flashnewsbot}`;
        text = `Sorry\\! Commission address update failed\\! Ask the [@flashNewsBotLink](${flashNewsBotLink}) for help\\.`;
      }
      await this.bot.sendMessage(msg.chat.id, text, {
        reply_to_message_id: msg.message_id,
        parse_mode: 'MarkdownV2',
      });
    }
  }

  async onStart(tgUserId: string) {
    await this.onInvite(tgUserId);
  }

  async onMyChatMember(msg: ChatMemberUpdated) {
    const config = await configFactory();
    const bot = config.tgbot.flashnewsbot;
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
          'canNotAddBot, group or channel exist',
          JSON.stringify(msg),
        );
        return;
      }
      await this.onJoin(msg, lang);
    }
  }

  async onJoin(msg: any, lang: string) {
    if (!msg.chat || !msg.from || !msg.date) {
      this.logger.error(
        'onJoin error : msg.chat or msg.from or msg.date is undefined',
      );
      return;
    }
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
      const isSend = cache.get(`isSend_${chatId}_${fromId}`);
      if (!isSend) {
        const config = await configFactory();
        const bot = config.tgbot.flashnewsbot;
        const text = `👏 Congrads\\! Now your the new inviter of this Group
👇Send your Wallet Address and mention @${this.formatMarkdownV2(bot)} to receive Trade Commission from members in this group\\!
[@${this.formatMarkdownV2(fromUsername)}](tg://user?id=${fromId})`;
        await this.bot.sendMessage(chatId, text, {
          reply_to_message_id: msg.message_id,
          parse_mode: 'MarkdownV2',
        });
        cache.set(`isSend_${chatId}_${fromId}`, '1');
      }
      await this.tgGroupAndChannelRepository.upsert(tgGroupAndChannel, true, [
        'chatId',
      ]);
    } catch (error) {
      this.logger.error('onJoin error', error.stack);
    }
  }

  async updateCommissionAddress(
    chatId: string,
    commissionAddress: string,
    commissionTgUserId: string,
    commissionTgUserName: string,
  ): Promise<{ code: number; data?: string }> {
    const addressExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    try {
      const tgGroupAndChannel =
        await this.tgGroupAndChannelRepository.findOneBy({
          chatId,
        });
      if (!tgGroupAndChannel) {
        this.logger.log(
          `updateCommissionAddress error : tgGroupAndChannel not exists. chatId:${chatId}`,
        );
        return { code: 0 };
      }
      if (tgGroupAndChannel.addressExpireAt > new Date()) {
        this.logger.log(
          `updateCommissionAddress error : addressExpireAt not expired. tgGroupAndChannel:${JSON.stringify(tgGroupAndChannel)}, commissionAddress:${commissionAddress}`,
        );
        return {
          code: 1,
          data: tgGroupAndChannel.addressExpireAt.getTime().toString(),
        };
      }
      await this.tgGroupAndChannelRepository.update(
        {
          commissionAddress,
          addressExpireAt,
          commissionTgUserId,
          commissionTgUserName,
        },
        { chatId },
      );
      return { code: 2 };
    } catch (error) {
      this.logger.error('updateCommissionAddress error', error.stack);
      return { code: 3, data: error.message };
    }
  }

  async onInvite(tgUserId: string) {
    const config = await configFactory();
    const botLink = `https://t.me/${config.tgbot.flashnewsbot}`;
    const text = `🤩Welcome to FlashNews Invite Bot

 •  Invite [@flashnewsBot](${botLink}) enter groups
 •  Send your Wallet Address to receive Trade Commission`;
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'Add Bot to Group',
            callback_data: `addbot_group`,
          },
          {
            text: 'Add Bot to Channel',
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
    const botLink = `https://t.me/${config.tgbot.flashnewsbot}`;
    const text = `Choose Language you want [@flashnewsBot](${botLink}) Bot Speak\\!`;
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

  async sendNews(code: string) {
    const config = await configFactory();
    const newsChannelIdCn = config.tgbot.newsChannelIdCn;
    const newsChannelIdEn = config.tgbot.newsChannelIdEn;
    let newsChannelId = '';
    const userMiniApp = config.tgbot.userMiniApp;
    const tgbot = `https://t.me/${config.tgbot.flashnewsbot}`;
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

🔥更多信息请到 👉flashNews TG \\([Go to mini app](${userMiniApp}?startapp=${news.code})\\)

🌈在您的群中推送 flashNews 邀请 [@flashNews](${tgbot}?startgroup=join_cn) 到您的群中
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

🔥More details Click here to 👉flashNews TG \\([Go to mini app](${userMiniApp}?startapp=${news.code})\\)

🌈Push flashNews Alerts in group? Invite [@flashNews](${tgbot}?startgroup=join_en) in your group
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
    const tgbot = `https://t.me/${config.tgbot.flashnewsbot}`;
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

🌈在您的群中推送 flashNews 邀请 [@flashNews](${tgbot}?startgroup=join_cn) 到您的群中
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

🌈Push flashNews Alerts in group? Invite [@flashNews](${tgbot}?startgroup=join_en) in your group
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
          const btnIndex = action.btnIndex ?? '';
          const btnIndexStr =
            btnIndex === ''
              ? ''
              : Math.max(parseInt(btnIndex) - 1, 0).toString();
          url = `${userMiniApp}?startapp=${code}_${btnIndexStr}`;
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
      select: ['chatId', 'commissionAddress'],
      where: { lang },
      order: { inviteDate: 'ASC' },
    });
    tgGroups.push({
      chatId: newsChannelId,
      commissionAddress: '',
    } as TgGroupAndChannel);
    for (const tgGroup of tgGroups) {
      const inlineKeyboardTmp = JSON.parse(
        JSON.stringify(reply_markup.inline_keyboard),
      );
      if (tgGroup.commissionAddress) {
        for (let i = 0; i < inlineKeyboardTmp.length; i++) {
          for (let j = 0; j < inlineKeyboardTmp[i].length; j++) {
            const inlineBtn = inlineKeyboardTmp[i][j];
            if ('url' in inlineBtn && inlineBtn.url.includes(userMiniApp)) {
              inlineBtn.url += `_${tgGroup.commissionAddress}`;
            }
          }
        }
      }
      try {
        if (photo === '') {
          const options = {
            reply_markup: { inline_keyboard: inlineKeyboardTmp },
            parse_mode,
          };
          res = await this.bot.sendMessage(tgGroup.chatId, caption, options);
        } else {
          const options = {
            reply_markup: { inline_keyboard: inlineKeyboardTmp },
            parse_mode,
            caption,
          };
          res = await this.bot.sendPhoto(tgGroup.chatId, photo, options);
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

  async updateFlashNews() {
    // update flashNews participants which was sended in 24 hours
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
          `updateFlashNews error, chatId:${tgMessage.chatId}, messageId:${tgMessage.messageId}, error:`,
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
          .replaceAll('_', '\\_')
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

  humanizeTimeDifference(differenceInSeconds: number) {
    let humanized;
    if (differenceInSeconds < 60) {
      humanized = `${differenceInSeconds}s`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      humanized = `${minutes}mins`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      humanized = `${hours}h`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      humanized = `${days}d`;
    }

    return {
      seconds: differenceInSeconds,
      humanized: humanized,
    };
  }
}
