import { Injectable, Logger } from '@nestjs/common';
import { ActionService } from 'src/action/action.service';
import { ActionUrl } from 'src/entities/actionUrl.entity';
import { BusinessException } from 'src/exception/business.exception';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';
import { Aws } from 'src/utils/aws';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    logger: Logger,
    private readonly actionUrlRespository: ActionUrlRepository,
    private readonly actionService: ActionService,
    private readonly aws: Aws,
  ) {
    this.logger = new Logger(ActionUrlService.name);
  }

  async findOneByCode(code: string) {
    const actionUrl = await this.actionUrlRespository.findOne({
      where: [{ code }],
      relations: ['creator'],
    });
    return actionUrl;
  }

  async findListByCreator(
    creatorId: bigint,
    page: number = 1,
    limit: number = 20,
  ) {
    const offset = Math.max((page - 1) * limit, 0);
    const [actionUrls, total] = await this.actionUrlRespository.findAndCount({
      where: { creatorId },
      select: ['code', 'title', 'description', 'createdAt', 'updatedAt'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: actionUrls,
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
    };
  }

  async add(params: any, creatorId: bigint): Promise<string> {
    const actionUrl = { ...params } as ActionUrl;
    const action = this.actionService.getAction(actionUrl.actionId);
    if (!action) {
      throw new BusinessException('Action not found');
    }
    actionUrl.creatorId = creatorId;
    const code = Math.random().toString(36).substring(2, 15);
    actionUrl.code = code;
    try {
      await this.actionUrlRespository.add(actionUrl);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to add actionUrl');
    }
    return code;
  }

  async updateByCode(code: string, params: any, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new BusinessException('ActionUrl not found');
    }
    if (actionUrl.creatorId !== creatorId) {
      throw new BusinessException('ActionUrl not found');
    }
    actionUrl.title = params.title;
    actionUrl.description = params.description;
    actionUrl.metadata = params.metadata;
    actionUrl.content = params.content;
    actionUrl.settings = params.settings;

    try {
      await this.actionUrlRespository.updateByCode(code, actionUrl);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to update actionUrl');
    }
    return code;
  }

  async deleteByCode(code: string, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new BusinessException('ActionUrl not found');
    }
    if (actionUrl.creatorId !== creatorId) {
      throw new BusinessException('ActionUrl not found');
    }
    try {
      await this.actionUrlRespository.deleteByCode(code);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to delete actionUrl');
    }
    return true;
  }

  async uploadMetadata(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const MAX_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new BusinessException('File size must not exceed 1MB.');
    }
    try {
      return await this.aws.uploadImg(file, fileName);
    } catch (error) {
      throw new BusinessException(error.message);
    }
  }
}
