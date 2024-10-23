import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBody,
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ActionMetadata, GenerateFormParams } from 'src/common/dto';
import { ResponseDto } from 'src/common/response.dto';

import { ActionService } from './action.service';
import { ActionResponseDto } from './dto/actions.dto';
import { GetCreator, OptionLogin } from '../auth/creator.decorators';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@ApiTags('actions')
@ApiExtraModels(ActionMetadata)
@Controller('actions')
export class ActionController extends BaseController {
  constructor(
    private readonly actionService: ActionService,
    private readonly configService: ConfigService,
  ) {
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
              items: { $ref: getSchemaPath(ActionResponseDto) },
            },
          },
        },
      ],
    },
  })
  @OptionLogin()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @GetCreator() creator: { address: string },
  ): Promise<ResponseDto<ActionResponseDto[]>> {
    const actions = await this.actionService.getAllActionMetadata(
      creator.address,
    );

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
            data: { $ref: getSchemaPath(ActionResponseDto) },
          },
        },
      ],
    },
  })
  async find(@Param('id') id: string): Promise<ResponseDto<ActionResponseDto>> {
    const action = await this.actionService.getActionMetadata(id);
    return this.success(action);
  }

  @Post(':id/validation')
  @CommonApiOperation('Validate transaction params before create intent-url.')
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
      example1: {
        summary: 'Validate Tx',
        description: 'post body',
        value: {
          tokenInAddress: '0x6e42d10eB474a17b14f3cfeAC2590bfa604313C7',
          tokenOutAddress: '0x461fE851Cd66e82A274570ED5767c873bE9Ae1ff',
          amountIn: '1',
          recipient: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
          deadlineDurationInSec: '3600',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Return generated transaction',
    schema: {
      type: 'string',
      example: 'Invalid Token Amount',
    },
  })
  async validateTransaction(
    @Param('id') id: string,
    @Body()
    body: GenerateFormParams,
  ): Promise<ResponseDto<string>> {
    const actionStore = await this.actionService.getActionStore(id);
    const response = await actionStore.validateFormData(body);
    return this.success(response);
  }
}
