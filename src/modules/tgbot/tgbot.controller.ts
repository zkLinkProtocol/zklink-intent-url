import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';

import { BaseController } from 'src/common/base.controller';

import { TgbotService } from './tgbot.service';

@Controller('tgbot')
export class TgbotController extends BaseController {
  logger: Logger = new Logger('TgbotController');
  constructor(private readonly tgbotService: TgbotService) {
    super();
  }

  @Post('update')
  async update(@Body() body: any) {
    try {
      this.tgbotService.update(body);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Get('testEditMessageReplyMarkupPollText')
  async testEditMessageReplyMarkupPollText(
    @Query('userId') userId: string,
    @Query('chatId') chatId: string,
    @Query('messageId') messageId: string,
    @Query('longOrShort') longOrShort: string,
    @Query('pollOrIntent') pollOrIntent: string,
    @Query('long') long: number,
    @Query('short') short: number,
  ) {
    try {
      this.tgbotService.editMessageReplyMarkupPollText(
        chatId,
        messageId,
        longOrShort,
        pollOrIntent,
        long,
        short,
        { inline_keyboard: [[]] },
        userId,
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('testAction')
  async testStart(@Query('action') action: string) {
    const tgUserId = '1352553794';
    try {
      switch (action) {
        case 'start':
          this.tgbotService.onStart(tgUserId);
          break;
        case 'create':
          this.tgbotService.onCreate(tgUserId);
          break;
        case 'portfolio':
          this.tgbotService.onPortfolio(tgUserId);
          break;
        case 'support':
          this.tgbotService.onSupport(tgUserId);
          break;
        case 'news':
          this.tgbotService.onNews(tgUserId);
          break;
        case 'invite':
          this.tgbotService.onInvite(tgUserId);
          break;
        case 'earn':
          this.tgbotService.onEarn(tgUserId);
          break;
      }
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('testMyMagicLink')
  async testMyMagicLink() {
    try {
      this.tgbotService.onMyMagicLink('1352553794');
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Get('testMagicLink')
  async testMagicLink(@Query('code') code: string) {
    try {
      this.tgbotService.sendMagicLink(code);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Get('testSendNews')
  async testSendNews(@Query('code') code: string) {
    try {
      this.tgbotService.sendNews(code);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Get('testSendMemeRedPacketMsg')
  async testSendMemeRedPacketMsg(
    @Query('inviteLink') inviteLink: string,
    @Query('tgUserId') tgUserId: string,
  ) {
    try {
      this.tgbotService.sendMemeRedPacketMsg(inviteLink, tgUserId);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('testOnJoin')
  async testOnJoin(@Body('data') data: any, @Query('lang') lang: string) {
    try {
      this.tgbotService.onJoin(data, lang);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
