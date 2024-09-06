import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
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
    this.bot.onText(/\/start/, (msg: any) => this.onStart(msg.chat.id));
    this.bot.onText(/\/myMagicLink/, (msg: any) =>
      this.onMyMagicLink(msg.from.id),
    );
  }

  async onStart(chatId: string) {
    const photo = 'https://pic.imgdb.cn/item/66bb2b02d9c307b7e9c8ec19.png';
    const caption = `<b>BTC up 10% in 10 minutes</b>
    🚨 Breaking News! BTC is up 10% in just 10 minutes! ⏱️  This is why we HODL 💎✋—the thrill of watching the king of crypto make its moves. 🔥 Whether you're stacking sats or just riding the waves, moments like these remind us why we're here. 🌊 The volatility is the heartbeat of this market, and for true believers, it’s just another step toward the moon. 🌕 Buckle up, because in the world of crypto, anything can happen in a blink. ⚡️ Stay sharp, and keep your eyes on the prize! 🎯`;
    const parse_mode: ParseMode = 'HTML';
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text: '🚀 Add to group',
            url: 'https://t.me/testintentbot?startgroup=true',
          },
        ],
      ],
    };
    const options = { reply_markup: reply_markup, parse_mode, caption };
    console.log(chatId, photo, options);
    try {
      const res = await this.bot.sendPhoto(chatId, photo, options);
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

  async update(body: any) {
    console.log(body);
    this.bot.processUpdate(body);
  }
}
