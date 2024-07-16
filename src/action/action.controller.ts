import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';

import { ActionService } from './action.service';
import { ActionResponseDto } from './dto/actions.dto';
import { GeneratedTransaction, ActionMetadata } from 'src/common/dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('actions')
@ApiExtraModels(ActionMetadata)
@Controller('actions')
export class ActionController extends BaseController {
  constructor(private readonly actionStoreService: ActionService) {
    super();
  }

  @Get()
  @CommonApiOperation('Get all actions.')
  @ApiResponse({
    status: 200,
    description: 'Return actions metadata',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ActionMetadata) },
            },
          },
        },
      ],
    },
  })
  findAll(): Promise<ResponseDto<ActionResponseDto[]>> {
    const actions = this.actionStoreService.getActions();
    return this.success(actions);
  }

  @Get(':id')
  @CommonApiOperation('Get action by Id.')
  @ApiResponse({
    status: 200,
    description: 'Return an action metadata',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(ActionMetadata) },
          },
        },
      ],
    },
  })
  find(@Param('id') id: string): Promise<ResponseDto<ActionResponseDto>> {
    return this.success(this.actionStoreService.getAction(id));
  }

  @Post(':id/transaction')
  @CommonApiOperation('Generate transaction by action Id.')
  @ApiBody({ type: [Object], description: 'Array of transaction parameters' })
  @ApiResponse({
    status: 200,
    description: 'Return generated transaction',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(GeneratedTransaction) },
          },
        },
      ],
    },
  })
  generateTransaction(
    @Param('id') id: string,
    @Body() body: any[],
  ): Promise<ResponseDto<GeneratedTransaction>> {
    return this.success(this.actionStoreService.generateTransaction(id, body));
  }
}
