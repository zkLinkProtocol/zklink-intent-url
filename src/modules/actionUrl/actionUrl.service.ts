import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { GenerateTransactionParams, TransactionInfo } from 'src/common/dto';
import { BusinessException } from 'src/exception/business.exception';
import { ActionService } from 'src/modules/action/action.service';
import {
  ActionRepository,
  CreatorRepository,
  IntentionRepository,
} from 'src/repositories';
import { UnitOfWork } from 'src/unitOfWork';

import { ActionUrlAddRequestDto } from './actionUrl.dto';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly intentionRepository: IntentionRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly actionRepository: ActionRepository,
    private readonly actionService: ActionService,
  ) {
    this.logger = new Logger(ActionUrlService.name);
  }

  async findOneByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    if (!intention) throw new BusinessException(`magiclink ${code} not found`);
    return intention;
  }

  async findListByCreator(
    creatorId: bigint,
    page: number = 1,
    limit: number = 20,
  ) {
    const offset = Math.max((page - 1) * limit, 0);
    const [intentions, total] = await this.intentionRepository.findAndCount({
      where: { creator: { id: creatorId } },
      select: [
        'code',
        'title',
        'metadata',
        'description',
        'createdAt',
        'updatedAt',
      ],
      relations: ['action'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const filteredActionUrls = intentions.map((item) => ({
      ...item,
      action: item.action
        ? {
            title: item.action.title,
            logo: item.action.logo,
            networks: item.action.networks.length,
          }
        : null,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      data: filteredActionUrls,
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
    };
  }

  async add(
    params: ActionUrlAddRequestDto & { active: boolean },
    creatorId: bigint,
  ): Promise<string> {
    const action = await this.actionService.getActionMetadata(params.actionId);
    const creator = await this.creatorRepository.findById(creatorId);
    if (!action) {
      throw new BusinessException('Action not found');
    }

    if (!creator) {
      throw new BusinessException('Creator not found');
    }

    const code = nanoid(8);
    const intentionRecord = this.intentionRepository.create({
      ...params,
      creator: creator,
      action: action,
      code,
    });
    return new Promise((resolve) => {
      try {
        this.unitOfWork.useTransaction(async () => {
          await this.intentionRepository.add(intentionRecord);
          this.logger.log(`a new intention is added ${code}`);
          resolve(code);
        });
      } catch (error) {
        this.logger.error(error);
        throw new BusinessException('Failed to add actionUrl');
      }
    });
  }

  async updateByCode(code: string, params: any, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new BusinessException('ActionUrl not found');
    }
    if (actionUrl.creator.id !== creatorId) {
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
    if (actionUrl.creator.id !== creatorId) {
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
    if (actionUrl.creator.id !== creatorId) {
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

  async generateTransaction(
    data: GenerateTransactionParams,
  ): Promise<TransactionInfo[]> {
    const actionUrl = await this.findOneByCode(data.additionalData.code!);
    const { action, actionVersion } = actionUrl;
    const actionStore = this.actionService.getActionVersionStore(
      action.id,
      actionVersion,
    );

    try {
      return actionStore.generateTransaction(data);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to generate transaction');
    }
  }

  async generateManagementInfo(code: string) {
    const actionUrl = await this.findOneByCode(code);
    const { action, actionVersion } = actionUrl;
    const actionStore = this.actionService.getActionVersionStore(
      action.id,
      actionVersion,
    );

    try {
      return actionStore.generateManagementInfo
        ? actionStore.generateManagementInfo(code)
        : null;
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to generate transaction');
    }
  }
}
