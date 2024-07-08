import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionId } from './adapter';
import { Action, ActionMetadata } from './interface';
import { Transaction } from 'ethers';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ActionResponseDto } from './actions.dto';

@Controller('actions')
export class ActionsController extends BaseController {
  constructor(private readonly actionsService: ActionsService) {
    super();
  }

  @Get()
  @CommonApiOperation('Get all actions.')
  findAll(): Promise<ResponseDto<ActionResponseDto[]>> {
    const actions = this.actionsService.findAll();
    return this.success(actions);
  }

  @Get(':id')
  @CommonApiOperation('Get action by Id.')
  find(@Param('id') id: ActionId): Promise<ResponseDto<ActionResponseDto>> {
    return this.success(this.actionsService.find(id));
  }

  @Post(':id/transaction/generate')
  @CommonApiOperation('Generate transaction by action Id.')
  generateTransaction(
    @Param('id') id: ActionId,
    @Body() body: any[],
  ): Promise<ResponseDto<Transaction>> {
    return this.success(this.actionsService.generateTransaction(id, body));
  }

  @Post(':id/transaction/post')
  @CommonApiOperation('Execute post transaction function by action Id.')
  postTransaction(
    @Param('id') id: ActionId,
    @Body() tx: Transaction,
  ): Promise<ResponseDto<boolean>> {
    return this.success(this.actionsService.postTransaction(id, tx));
  }
}
