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
import { Transaction, TransactionRequest } from 'ethers';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ActionResponseDto } from './actions.dto';
import { GeneratedTransaction } from './interface';

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
  ): Promise<ResponseDto<GeneratedTransaction>> {
    return this.success(this.actionsService.generateTransaction(id, body));
  }
}
