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
  ApiParam,
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
  async findAll(): Promise<ResponseDto<ActionResponseDto[]>> {
    const actions = await this.actionStoreService.getActions();
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
  async find(@Param('id') id: string): Promise<ResponseDto<ActionResponseDto>> {
    const action = await this.actionStoreService.getAction(id);
    return this.success(action);
  }

  @Post(':id/transaction')
  @CommonApiOperation('Generate transaction by action Id.')
  @ApiParam({
    name: 'id',
    example: 'novaswap',
  })
  @ApiBody({
    description: 'parameters to generate transaction',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'any',
      },
    },
    examples: {
      a: {
        summary: 'NovaSwap',
        description: 'Generate tranasction for NovaSwap',
        value: {
          tokenInAddress: '0x6e42d10eB474a17b14f3cfeAC2590bfa604313C7',
          tokenOutAddress: '0x461fE851Cd66e82A274570ED5767c873bE9Ae1ff',
          amountIn: 1,
          recipient: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
          fee: 3000,
          deadlineDurationInSec: 3600,
        },
      },
    },
  })
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
  async generateTransaction(
    @Param('id') id: string,
    @Body() body: { [key: string]: any },
  ): Promise<ResponseDto<GeneratedTransaction>> {
    const response = await this.actionStoreService.generateTransaction(
      id,
      body,
    );
    return this.success(response);
  }
}
