import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import TelegramBot, { ParseMode } from 'node-telegram-bot-api';

import { CreatorRepository, IntentionRepository } from 'src/repositories';

import { ActionUrlService } from '../actionUrl/actionUrl.service';
import { BlinkService } from '../actionUrl/blink.service';

@Injectable()
export class AibotService implements OnModuleInit {
  private logger: Logger = new Logger(AibotService.name);
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
    const token = '7828990333:AAEEnTw4nR3pIbwdshs7x9Li-t_AZIQO_BM';
    const webHookUrl =
      'https://api-intent.sepolia.zklink.io/api/tgbot/aibot/update';
    this.bot = new TelegramBot(token);
    this.bot.setWebHook(webHookUrl);
    await this.eventInit();
  }

  private async eventInit() {
    this.bot.on('text', async (msg: any) => {
      await this.receiveMessage(msg);
    });
  }

  async receiveMessage(message: any) {
    this.logger.log('receiveMessage', JSON.stringify(message));
  }

  async sendMessage(tgUserId: string, text: string) {
    const caption = this.formatMarkdownV2(text);
    const parse_mode: ParseMode = 'MarkdownV2';
    try {
      let res = null;
      const options = { parse_mode, caption };
      res = await this.bot.sendMessage(tgUserId, caption, options);
      this.logger.log('sendMessage success', JSON.stringify(res));
    } catch (error) {
      this.logger.error(`sendMessage error`, error.stack);
      this.logger.log(`caption:${caption}, tgUserId:${tgUserId}`);
    }
  }

  formatMarkdownV2(text: string) {
    // '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'
    return !text
      ? ''
      : text
          .replaceAll('.', '\\.')
          .replaceAll('-', '\\-')
          .replaceAll('_', '\\_')
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
