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
import { Action } from './interface';
import { Transaction } from 'ethers';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Get()
  findAll(): { [id: ActionId]: Action } {
    return this.actionsService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: ActionId): Action {
    return this.actionsService.find(id);
  }

  @Post(':id/transaction/generate')
  generateTransaction(
    @Param('id') id: ActionId,
    @Body() body: any[],
  ): Transaction {
    return this.actionsService.generateTransaction(id, body);
  }

  @Post(':id/transaction/post')
  postTransaction(@Param('id') id: ActionId, @Body() tx: Transaction): boolean {
    return this.actionsService.postTransaction(id, tx);
  }
}
