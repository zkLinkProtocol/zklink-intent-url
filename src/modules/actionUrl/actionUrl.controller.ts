import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ActionTransactionParams, GeneratedTransaction } from 'src/common/dto';
import { PagingOptionsDto } from 'src/common/pagingOptionsDto.param';
import { PagingMetaDto, ResponseDto } from 'src/common/response.dto';
import { BusinessException } from 'src/exception/business.exception';

import {
  ActionUrlAddRequestDto,
  ActionUrlFindOneResponseDto,
  ActionUrlResponseDto,
  ActionUrlUpdateRequestDto,
} from './actionUrl.dto';
import { ActionUrlService } from './actionUrl.service';
import { BlinkService } from './blink.service';
import {
  IntentionRecordAddRequestDto,
  IntentionRecordFindOneResponseDto,
  IntentionRecordListItemResponseDto,
} from './intentionRecord.dto';
import { IntentionRecordService } from './intentionRecord.service';
import { ActionService } from '../action/action.service';
import { GetCreator } from '../auth/creator.decorators';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('action-url')
@ApiTags('action-url')
export class ActionUrlController extends BaseController {
  constructor(
    private readonly actionUrlService: ActionUrlService,
    private readonly actionService: ActionService,
    private readonly intentionRecordService: IntentionRecordService,
    private readonly blinkService: BlinkService,
  ) {
    super();
  }

  @Get(':code')
  @CommonApiOperation(
    'Returns the configuration information for a single actionUrl.',
  )
  async findOne(
    @Param('code') code: string,
  ): Promise<ResponseDto<ActionUrlResponseDto>> {
    const result = await this.actionUrlService.findOneByCode(code);

    const response = {
      code: result.code,
      actionAuthor: result.action.author,
      title: result.title,
      description: result.description,
      metadata: result.metadata,
      settings: result.settings,
      logo: result.action.logo,
      creator: {
        publickey: result.creator.publickey,
        address: result.creator.address,
        publicId: result.creator.publicId,
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
    @Body() request: { sender: string; params: ActionTransactionParams },
  ): Promise<ResponseDto<GeneratedTransaction>> {
    const { sender, params } = request;
    const actionStore = await this.actionService.getActionStore(code);
    if (!actionStore.afterActionUrlCreated) {
      throw new BusinessException('No post transactions!');
    }

    const data = await actionStore.afterActionUrlCreated({
      code,
      sender,
      params,
    });

    return this.success(data);
  }

  @Get(':code/real-time-data')
  @CommonApiOperation(
    'Returns the configuration information for a single actionUrl.',
  )
  async getRefreshContent(
    @Param('code') code: string,
    @Body() request: { sender: string; params: ActionTransactionParams },
  ): Promise<
    ResponseDto<{
      title: string;
      content: string;
    } | null>
  > {
    const { sender, params } = request;
    const actionStore = await this.actionService.getActionStore(code);
    if (!actionStore.getRealTimeContent) {
      return this.success(null);
    }
    const data = await actionStore.getRealTimeContent({
      code,
      sender,
      params,
    });
    return this.success(data);
  }

  @Get('auth/list')
  @CommonApiOperation('Returns the actionUrls created by oneself.')
  @UseGuards(JwtAuthGuard)
  async findListAuth(
    @Query() pagingOptions: PagingOptionsDto,
    @GetCreator() creator: { id: bigint },
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
    @GetCreator() creator: { id: bigint },
  ): Promise<ResponseDto<ActionUrlFindOneResponseDto>> {
    const result = await this.actionUrlService.findOneByCode(code);
    if ((result?.creatorId ?? '') !== creator.id) {
      throw new BusinessException('ActionUrl not found');
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
    @GetCreator() creator: { id: bigint },
  ): Promise<ResponseDto<string>> {
    const actionStore = await this.actionService.getActionStore(
      request.actionId,
    );
    if (!actionStore) {
      return this.error('Action not found');
    }
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
    @GetCreator() creator: { id: bigint },
  ): Promise<ResponseDto<string>> {
    const result = await this.actionUrlService.updateByCode(
      code,
      request,
      creator.id,
    );
    return this.success(result);
  }

  @Put(':code/activate')
  @CommonApiOperation('Activate the actionUrl associated with the given code.')
  @UseGuards(JwtAuthGuard)
  async activateCode(
    @Param('code') code: string,
    @GetCreator() creator: { id: bigint },
  ): Promise<ResponseDto<string>> {
    const result = await this.actionUrlService.updateActiveStatusByCode(
      code,
      creator.id,
    );
    return this.success(result);
  }

  @Delete(':code')
  @CommonApiOperation('Delete the actionUrl created by oneself.')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('code') path: string,
    @GetCreator() creator: { id: bigint },
  ): Promise<ResponseDto<boolean>> {
    const result = await this.actionUrlService.deleteByCode(path, creator.id);
    return this.success(result);
  }

  // post intention record and txs
  @Post(':code/intention-record')
  @CommonApiOperation('Post intention record and txs.')
  async postIntentionRecord(
    @Param('code') code: string,
    @Body() request: IntentionRecordAddRequestDto,
  ): Promise<ResponseDto<boolean>> {
    const result = await this.intentionRecordService.add(code, request);
    return this.success(result);
  }

  // get intention record list with txs
  @Get(':code/intention-record')
  @CommonApiOperation('Get intention record list with txs.')
  async getIntentionRecordList(
    @Param('code') code: string,
    @Query('publicKey') publicKey: string,
    @Query('address') address: string,
    @Query() pagingOptions: PagingOptionsDto,
  ): Promise<ResponseDto<IntentionRecordListItemResponseDto[]>> {
    const { page = 1, limit = 20 } = pagingOptions;
    const result = await this.intentionRecordService.findListByCodeAndPublickey(
      code,
      publicKey,
      address,
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

  // get intention record with txs by id
  @Get('intention-record/:id')
  @CommonApiOperation(
    'Get intention record with txs by id.',
    IntentionRecordFindOneResponseDto,
  )
  async getIntentionRecord(
    @Param('id') id: bigint,
    @Query('publicKey') publicKey: string,
    @Query('address') address: string,
  ): Promise<ResponseDto<IntentionRecordFindOneResponseDto>> {
    const result = await this.intentionRecordService.findOneById(id);
    if (!result) {
      return this.error('Intention record not found');
    }
    if (publicKey && result.publickey !== publicKey) {
      return this.error('Intention record not found under the public key');
    }
    if (address && result.address !== address) {
      return this.error('Intention record not found under the address');
    }
    return this.success(result as IntentionRecordFindOneResponseDto);
  }

  // https://xxx.com/aciont-url/:code/metadata
  @Get(':code/metadata')
  async metadata(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader('Access-Control-Expose-Headers', 'X-Blockchain-Ids');
    const metadata = {
      icon: '',
      title: '',
      description: '',
      label: '',
      disable: false,
      error: {
        message: '',
      },
      links: {
        actions: [],
      },
    };
    const intention = await this.actionUrlService.findOneByCode(code);
    if (!intention) {
      metadata.error.message = 'Action not found';
      // res.json(metadata);
      return metadata;
    }
    const chainId =
      (intention.settings as any)?.intentInfo?.network?.chainId ?? 0;
    res.setHeader('X-Blockchain-Ids', `eip155:${chainId}`);
    metadata.icon = intention.metadata;
    metadata.title = intention.title;
    metadata.description = intention.description;

    metadata.links.actions = await this.blinkService.getMetadataActions(
      code,
      intention.settings,
    );
    // res.json(metadata);
    return metadata;
  }

  // https://xxx.com/aciont-url/:code/build-transactions
  @Post(':code/build-transactions')
  async buildTransactions(
    @Param('code') code: string,
    @Body('account') account: string,
    @Param() Params: any,
    @Body() body: any,
    @Query() query: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader('Access-Control-Expose-Headers', 'X-Blockchain-Ids');
    const response = {
      transaction: '',
      message: '',
    };
    const intention = await this.actionUrlService.findOneByCode(code);
    if (!intention) {
      response.message = 'Action not found';
      return response;
    }

    const chainId =
      (intention.settings as any)?.intentInfo?.network?.chainId ?? 0;
    res.setHeader('X-Blockchain-Ids', `eip155:${chainId}`);
    const allParams = { ...Params, ...body, ...query };
    try {
      const transaction = await this.blinkService.buildTransactions(
        code,
        intention.actionId,
        account,
        allParams,
      );
      response.transaction = transaction;
    } catch (error) {
      response.message = error.message;
    }
    return response;
  }
}
