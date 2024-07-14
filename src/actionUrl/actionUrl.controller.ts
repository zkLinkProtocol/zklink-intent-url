import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActionUrlService } from './actionUrl.service';
import { CommonApiOperation } from 'src/common/base.decorators';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { GetCreator } from 'src/auth/creator.decorators';
import {
  ActionUrlAddRequestDto,
  ActionUrlFindOneResponseDto,
  ActionUrlUpdateRequestDto,
} from './actionUrl.dto';
import { PagingMetaDto, ResponseDto } from 'src/common/response.dto';
import { BaseController } from 'src/common/base.controller';
import { PagingOptionsDto } from 'src/common/pagingOptionsDto.param';

@Controller('actionurl')
@ApiTags('actionurl')
export class ActionUrlController extends BaseController {
  constructor(private readonly actionUrlService: ActionUrlService) {
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
    if (!result) {
      return this.error('ActionUrl not found');
    }
    const { createdAt, updatedAt, deletedAt, creatorId, ...rest } = result;
    const response = {
      ...rest,
      creator: {
        publickey: result.creator.publickey,
        address: result.creator.address,
      },
    };
    return this.success(response);
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
    const { createdAt, updatedAt, deletedAt, creatorId, ...rest } = result;
    const response = {
      ...rest,
      creator: {
        id: result.creator.id,
        publickey: result.creator.publickey,
        address: result.creator.address,
      },
    };
    return this.success(response);
  }

  @Post('add')
  @CommonApiOperation('Create a new actionUrl.')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: ActionUrlAddRequestDto,
    @GetCreator() creator,
  ): Promise<ResponseDto<string>> {
    const result = await this.actionUrlService.add(request, creator.id);
    return this.success(result);
  }

  @Post('edit/:code')
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

  @Post('delete/:code')
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
