import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import html2md from 'html-to-md';
import TelegramBot, { ParseMode } from 'node-telegram-bot-api';

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
    // this.bot.onText(/\/start/, (msg: any) => this.onStart(msg.from.id));
    this.bot.onText(/\/my/, (msg: any) => this.onMyMagicLink(msg.from.id));
    this.bot.onText(/Create/, (msg: any) => this.onCreate(msg.from.id));
    this.bot.onText(/Portfolio/, (msg: any) => this.onPortfolio(msg.from.id));
    this.bot.onText(/Support/, (msg: any) => this.onSupport(msg.from.id));
    this.bot.onText(/News/, (msg: any) => this.onNews(msg.from.id));
    this.bot.onText(/Invite/, (msg: any) => this.onInvite(msg.from.id));
    this.bot.onText(/Earn/, (msg: any) => this.onEarn(msg.from.id));
    this.bot.on('text', (msg: any) => {
      switch (msg.text) {
        case '/start':
          this.onStart(msg.from.id);
          break;
      }
    });
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

    // 🗞 [*__Follow__*](https://t.me/${config.tgbot.newsChannelIdEn}) up with flashNews to know the first\\-hand crypto message\\!

    // 💳 [*__Check__*](${userMiniApp}?startapp=portfolio) your Portfolio & Magic Account

    // 💰 [*__Deposit__*](${userMiniApp}?startapp=deposit) Crypto Assets to your Magic Account in multiple Chains including all EVM Chain\\, Solana\\, SUI and so on\\.

    // 🧠 Learn about magicLink with Magic Academy\\.

    // 🫂 [*__Invite__*](${userMiniApp}?startapp=invite) your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

    // ⛓ Manage magicLinks you create before\\.`;
    const caption = `Welcome to magicLink\\! The magicLink TG Mini APP is a dedicated application under magicLink\\, specifically designed for the TG ecosystem\\. 

🔮 The app supports users in creating and managing magicLinks while providing essential interaction capabilities\\, enabling seamless connections with other magicLinks\\.
    
💫 [*__Create__*](https://magic.zklink.io/dashboard/intent) magicLink & unlock potential to grab even more strategies with fun\\! 

🗞 [*__Follow__*](https://t.me/${config.tgbot.newsChannelIdEn}) up with flashNews to know the first\\-hand crypto message\\!

💳 Check your Portfolio & Magic Account 

💰 Deposit Crypto Assets to your Magic Account in multiple Chains including all EVM Chain\\, Solana\\, SUI and so on\\.

🧠 Learn about magicLink with Magic Academy\\.

🫂 [*__Invite__*](${userMiniApp}?startapp=invite) your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

⛓ Manage magicLinks you create before\\.`;
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
    // const config = await configFactory();
    // const creator = await this.creatorRepository.findOneBy({ tgUserId });
    // let walletAddress = '';
    // let ethBalance = BigInt(0);
    // if (creator) {
    //   walletAddress = creator.address;
    //   try {
    //     const novaProvider = this.chainService.getProvider(Chains.ZkLinkNova);
    //     ethBalance = await novaProvider.getBalance(walletAddress);
    //   } catch (error) {
    //     this.logger.error(`onStart error`, error.stack);
    //   }
    // }
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
    const text = `Want to know first hand Crypto News? Follow up with our flashNews Channel\\!`;
    // text = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: 'flashNews Channel',
            url: channelLink,
          },
          {
            text: 'flashNews中文频道',
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
    // const config = await configFactory();
    // const botLink = `https://t.me/${config.tgbot.tgbot}`;
    // const url = encodeURIComponent(botLink);

    //     const tgShareUrl = `https://t.me/share/url?url=${url}&text=💫 Join magicLink Telegram and enjoy lower transaction fees with my referral code.

    // 🔮The magicLink TG Mini APP is a dedicated application under magicLink, specifically designed for the TG ecosystem.

    // 🔮magicLink offers multi-chain wallet and asset management features, allowing users to quickly create and manage magicLinks across multiple chains, simplifying asset transfers and interactions.`;
    //     const text = `Invite your friends to magicLink to get part of their transaction fees and earn extra rewards\\.

    // Current Invitee: 0
    // Share to More friends and groups here\\!`;
    // const text = `Would you like to add the MagicLink bot to your group or channel \\?`;
    // const parse_mode: ParseMode = 'MarkdownV2';
    // const reply_markup = {
    //   inline_keyboard: [
    //     [
    //       {
    //         text: 'Group',
    //         callback_data: `addbot_group`,
    //       },
    //       {
    //         text: 'Channel',
    //         url: `${botLink}?startchannel=join&admin=post_messages`,
    //       },
    //     ],
    //   ],
    // };
    // const options = { reply_markup: reply_markup, parse_mode };

    const text = `Coming soon\\!`;
    const parse_mode: ParseMode = 'MarkdownV2';
    const options = { parse_mode };
    try {
      const res = await this.bot.sendMessage(tgUserId, text, options);
      this.logger.log(`onInvite success : `, JSON.stringify(res));
    } catch (error) {
      this.logger.error(`onInvite error`, error.stack);
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
    try {
      const options = { reply_markup, parse_mode };
      const res = await this.bot.sendMessage(tgUserId, caption, options);
      this.logger.log('sendMemeRedPacketMsg success', JSON.stringify(res));
    } catch (error) {
      this.logger.error(`sendMemeRedPacketMsg error`, error.stack);
      this.logger.log(`tgUserId:${tgUserId}, caption:${caption}`);
    }
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
}
