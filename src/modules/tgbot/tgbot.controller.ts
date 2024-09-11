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

  @Get('editMessageReplyMarkupPollText')
  async editMessageReplyMarkupPollText(
    @Query('chatId') chatId: string,
    @Query('messageId') messageId: string,
    @Query('longOrShort') longOrShort: string,
  ) {
    try {
      this.tgbotService.editMessageReplyMarkupPollText(
        chatId,
        messageId,
        longOrShort,
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('testStart')
  async testStart() {
    try {
      this.tgbotService.onStart('1352553794');
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
}
