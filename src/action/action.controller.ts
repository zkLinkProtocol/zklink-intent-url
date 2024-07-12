import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';

import { ActionService } from './action.service';
import { ActionResponseDto } from './dto/actions.dto';
import type { GeneratedTransaction, ActionId } from 'src/common/interfaces';

@Controller('action')
export class ActionController extends BaseController {
  constructor(private readonly actionStoreService: ActionService) {
    super();
  }

  @Get()
  @CommonApiOperation('Get all actions.')
  findAll(): Promise<ResponseDto<ActionResponseDto[]>> {
    const actions = this.actionStoreService.getActions();
    return this.success(actions);
  }

  @Get(':id')
  @CommonApiOperation('Get action by Id.')
  find(@Param('id') id: ActionId): Promise<ResponseDto<ActionResponseDto>> {
    return this.success(this.actionStoreService.getAction(id));
  }

  @Post(':id/transaction/generate')
  @CommonApiOperation('Generate transaction by action Id.')
  generateTransaction(
    @Param('id') id: ActionId,
    @Body() body: any[],
  ): Promise<ResponseDto<GeneratedTransaction>> {
    return this.success(this.actionStoreService.generateTransaction(id, body));
  }
}
