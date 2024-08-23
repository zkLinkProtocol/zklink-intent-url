import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { Intention } from 'src/entities/intention.entity';
import { BusinessException } from 'src/exception/business.exception';
import { ActionService } from 'src/modules/action/action.service';
import { IntentionRepository } from 'src/repositories/intention.repository';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    logger: Logger,
    private readonly intentionRepository: IntentionRepository,
    private readonly actionService: ActionService,
  ) {
    this.logger = new Logger(ActionUrlService.name);
  }

  async findOneByCode(code: string) {
    const actionUrl = await this.intentionRepository.findOne({
      where: [{ code }],
      relations: ['creator'],
    });
    if (!actionUrl) throw new BusinessException('ActionUrl not found');
    return actionUrl;
  }

  async findListByCreator(
    creatorId: bigint,
    page: number = 1,
    limit: number = 20,
  ) {
    const offset = Math.max((page - 1) * limit, 0);
    const [actionUrls, total] = await this.intentionRepository.findAndCount({
      where: { creatorId },
      select: [
        'code',
        'title',
        'metadata',
        'description',
        'createdAt',
        'updatedAt',
      ],
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
    const actionUrl = { ...params } as Intention;
    const action = await this.actionService.getActionMetadata(
      actionUrl.actionId,
    );
    if (!action) {
      throw new BusinessException('Action not found');
    }
    actionUrl.creatorId = creatorId;
    const code = nanoid(8);
    actionUrl.code = code;
    try {
      await this.intentionRepository.add(actionUrl);
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
    actionUrl.settings = params.settings;

    try {
      await this.intentionRepository.updateByCode(code, actionUrl);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to update actionUrl');
    }
    return code;
  }

  async updateActiveStatusByCode(code: string, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new BusinessException('ActionUrl not found');
    }
    if (actionUrl.creatorId !== creatorId) {
      throw new UnauthorizedException('Not your own intent');
    }
    actionUrl.active = true;

    try {
      await this.intentionRepository.updateByCode(code, actionUrl);
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
      await this.intentionRepository.deleteByCode(code);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to delete actionUrl');
    }
    return true;
  }
}
