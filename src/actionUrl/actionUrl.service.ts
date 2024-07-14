import { Injectable, Logger } from '@nestjs/common';
import { off } from 'process';
import { ActionUrl } from 'src/entities/actionUrl.entity';
import { ActionUrlRepository } from 'src/repositories/actionUrl.repository';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    logger: Logger,
    private readonly actionUrlRespository: ActionUrlRepository,
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
    actionUrl.creatorId = creatorId;
    const code = Math.random().toString(36).substring(2, 15);
    actionUrl.code = code;
    try {
      await this.actionUrlRespository.add(actionUrl);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to add actionUrl');
    }
    return code;
  }

  async updateByCode(code: string, params: any, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new Error('ActionUrl not found');
    }
    if (actionUrl.creatorId !== creatorId) {
      throw new Error('ActionUrl not found');
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
      throw new Error('Failed to update actionUrl');
    }
    return code;
  }

  async deleteByCode(code: string, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new Error('ActionUrl not found');
    }
    if (actionUrl.creatorId !== creatorId) {
      throw new Error('ActionUrl not found');
    }
    try {
      await this.actionUrlRespository.deleteByCode(code);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to delete actionUrl');
    }
    return true;
  }
}
