import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BaseController } from 'src/common/base.controller';

import { AibotService } from './aibot.service';
import { FlashNewsBotService } from './flashNewsBot.service';
import { SendNewsOriginRequestDto } from './tgbot.dto';
import { TgbotService } from './tgbot.service';
import { ActionService } from '../action/action.service';
import { GetCreator } from '../auth/creator.decorators';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('tgbot')
export class TgbotController extends BaseController {
  logger: Logger = new Logger('TgbotController');
  constructor(
    private readonly tgbotService: TgbotService,
    private readonly flashNewsBotService: FlashNewsBotService,
    private readonly actionService: ActionService,
    private readonly aibotService: AibotService,
  ) {
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

  @Post('flashnewsbot/update')
  async flashnewsbotUpdate(@Body() body: any) {
    try {
      this.flashNewsBotService.update(body);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('aibot/update')
  async aibotUpdate(@Body() body: any) {
    try {
      this.aibotService.update(body);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('aibot/sendMessage')
  async aibotSendMessage(@Body() data: any) {
    try {
      this.aibotService.sendMessage(data.tgUserId, data.text);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('sendNewsOrigin')
  @UseGuards(JwtAuthGuard)
  async sendNewsOrigin(
    @Body() body: SendNewsOriginRequestDto,
    @GetCreator() creator: { id: bigint; address: string },
  ) {
    const whiteListPermission = await this.actionService.checkActionWhitelist(
      'news',
      creator.address,
    );
    if (!whiteListPermission) {
      return this.error('Permission denied');
    }
    try {
      await this.flashNewsBotService.sendNewsOrigin(
        body.title,
        body.description,
        body.metadata,
        body.fromTokenAddress,
        body.toTokenAddress,
        body.settings,
      );
      return this.success(true);
    } catch (error) {
      this.logger.error(error);
      return this.error(error.message);
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
      this.flashNewsBotService.editMessageReplyMarkupPollText(
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
        case 'flashStart':
          this.flashNewsBotService.onStart(tgUserId);
          break;
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
      this.flashNewsBotService.sendNews(code);
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
      this.flashNewsBotService.onJoin(data, lang);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('onMyChatMember')
  async onMyChatMember(@Body('data') data: any) {
    try {
      this.flashNewsBotService.onMyChatMember(data);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Get('onInviteReply')
  async onInviteReply(
    @Query('userId') userId: string,
    @Query('chatId') chatId: string,
    @Query('messageId') messageId: string,
  ) {
    try {
      this.flashNewsBotService.onInviteReply(userId, chatId, messageId);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('onUpdateCommissionAddress')
  async onUpdateCommissionAddress(@Body('data') data: any) {
    try {
      const res = await this.flashNewsBotService.updateCommissionAddress(
        data.chatId,
        data.commissionAddress,
        data.commissionTgUserId,
        data.commissionTgUserName,
      );
      return this.success(res);
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  @Post('onGroupChat')
  async onGroupChat(@Body('data') data: any) {
    try {
      const res = await this.flashNewsBotService.onGroupChat(data);
      return this.success(res);
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
