import { Controller, Get, UseGuards } from '@nestjs/common';

import { CommonApiOperation } from './common/base.decorators';
import { MENUS, MagicNewsMenu } from './config/menu';
import { ActionService } from './modules/action/action.service';
import { GetCreator, OptionLogin } from './modules/auth/creator.decorators';
import { JwtAuthGuard } from './modules/auth/jwtAuth.guard';

@Controller()
export class AppController {
  constructor(private readonly actionService: ActionService) {}

  @Get('menu')
  @CommonApiOperation('Get the dashboard left menu')
  @OptionLogin()
  @UseGuards(JwtAuthGuard)
  async getHello(@GetCreator() creator: { address?: string }) {
    if (!creator?.address) {
      return MENUS;
    }

    const whiteListPermission = await this.actionService.checkActionWhitelist(
      'news',
      creator.address,
    );

    if (!whiteListPermission) {
      return MENUS;
    }

    return [...MENUS, MagicNewsMenu];
  }
}
