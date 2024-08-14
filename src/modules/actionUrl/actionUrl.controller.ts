import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ActionTransactionParams } from 'src/common/dto';
import { PagingOptionsDto } from 'src/common/pagingOptionsDto.param';
import { PagingMetaDto, ResponseDto } from 'src/common/response.dto';

import {
  ActionUrlAddRequestDto,
  ActionUrlFindOneResponseDto,
  ActionUrlUpdateRequestDto,
} from './actionUrl.dto';
import { ActionUrlService } from './actionUrl.service';
import { ActionService } from '../action/action.service';
import { GetCreator } from '../auth/creator.decorators';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('action-url')
@ApiTags('action-url')
export class ActionUrlController extends BaseController {
  constructor(
    private readonly actionUrlService: ActionUrlService,
    private readonly actionStoreService: ActionService,
  ) {
    super();
  }

  @Get(':code')
  @CommonApiOperation(
    'Returns the configuration information for a single actionUrl.',
  )
  async findOne(
    @Param('code') code: string,
  ): Promise<ResponseDto<ActionUrlFindOneResponseDto>> {
    const result = await this.actionUrlService.findOneByCode(code);
    const actionStore = await this.actionStoreService.getActionStore(
      result.actionId,
    );
    const hasPostTxs = !!actionStore.afterActionUrlCreated;
    if (!result) {
      return this.error('ActionUrl not found');
    }
    const response = {
      code: result.code,
      actionId: result.actionId,
      title: result.title,
      description: result.description,
      metadata: result.metadata,
      settings: result.settings,
      hasPostTxs,
      creator: {
        publickey: result.creator.publickey,
        address: result.creator.address,
      },
    };
    return this.success(response);
  }

  @Get(':code/post-transactions')
  @CommonApiOperation(
    'Returns the configuration information for a single actionUrl.',
  )
  @UseGuards(JwtAuthGuard)
  async getIntentPostTxs(
    @Param('code') code: string,
    @Body() request: ActionTransactionParams,
  ): Promise<ResponseDto<ActionUrlFindOneResponseDto>> {
    const actionStore = await this.actionStoreService.getActionStore(code);
    const data = actionStore.afterActionUrlCreated(code, request);
    return this.success(data);
  }

  @Get('auth/list')
  @CommonApiOperation('Returns the actionUrls created by oneself.')
  @UseGuards(JwtAuthGuard)
  async findListAuth(
    @Query() pagingOptions: PagingOptionsDto,
    @GetCreator() creator,
  ): Promise<ResponseDto<ActionUrlFindOneResponseDto[]>> {
    const { page = 1, limit = 20 } = pagingOptions;
    const result = await this.actionUrlService.findListByCreator(
      creator.id,
      page,
      limit,
    );
    const meta = {
      currentPage: result.currentPage,
      itemsPerPage: result.itemsPerPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    } as PagingMetaDto;
    return this.success(result.data, meta);
  }

  @Get('auth/:code')
  @CommonApiOperation('Returns the single actionUrl created by oneself.')
  @UseGuards(JwtAuthGuard)
  async findOneAuth(
    @Param('code') code: string,
    @GetCreator() creator,
  ): Promise<ResponseDto<ActionUrlFindOneResponseDto>> {
    const result = await this.actionUrlService.findOneByCode(code);
    if ((result?.creatorId ?? '') !== creator.id) {
      return this.error('ActionUrl not found');
    }
    const response = {
      code: result.code,
      actionId: result.actionId,
      title: result.title,
      description: result.description,
      metadata: result.metadata,
      settings: result.settings,
      creator: {
        id: result.creator.id,
        publickey: result.creator.publickey,
        address: result.creator.address,
      },
    };
    return this.success(response);
  }

  @Post('')
  @CommonApiOperation('Create a new actionUrl.')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: ActionUrlAddRequestDto,
    @GetCreator() creator,
  ): Promise<ResponseDto<string>> {
    const actionStore = await this.actionStoreService.getActionStore(
      request.actionId,
    );
    const active = actionStore.afterActionUrlCreated ? false : true;
    const requestData = { ...request, active };
    const result = await this.actionUrlService.add(requestData, creator.id);
    return this.success(result);
  }

  @Put(':code')
  @CommonApiOperation('Edit the actionUrl created by oneself.')
  @UseGuards(JwtAuthGuard)
  async edit(
    @Param('code') code: string,
    @Body() request: ActionUrlUpdateRequestDto,
    @GetCreator() creator,
  ): Promise<ResponseDto<string>> {
    const result = await this.actionUrlService.updateByCode(
      code,
      request,
      creator.id,
    );
    return this.success(result);
  }

  @Delete(':code')
  @CommonApiOperation('Delete the actionUrl created by oneself.')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('code') path: string,
    @GetCreator() creator,
  ): Promise<ResponseDto<boolean>> {
    const result = await this.actionUrlService.deleteByCode(path, creator.id);
    return this.success(result);
  }
}
