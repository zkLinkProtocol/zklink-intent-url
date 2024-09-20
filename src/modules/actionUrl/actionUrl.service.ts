import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { GenerateTransactionParams, TransactionInfo } from 'src/common/dto';
import { BusinessException } from 'src/exception/business.exception';
import { ActionService } from 'src/modules/action/action.service';
import { ActionRepository, IntentionRepository } from 'src/repositories';
import { UnitOfWork } from 'src/unitOfWork';

import { ActionUrlAddRequestDto } from './actionUrl.dto';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly intentionRepository: IntentionRepository,
    private readonly actionRepository: ActionRepository,
    private readonly actionService: ActionService,
  ) {
    this.logger = new Logger(ActionUrlService.name);
  }

  async findOneByCode(code: string) {
    const intention = await this.intentionRepository.queryIntentionByCode(code);
    if (!intention) throw new BusinessException(`intention ${code} not found`);
    return intention;
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
      relations: ['action'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const filteredActionUrls = actionUrls.map((item) => ({
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
    if (!action) {
      throw new BusinessException('Action not found');
    }
    const code = nanoid(8);
    const intentionRecord = this.intentionRepository.create({
      ...params,
      creatorId,
      code,
    });
    return new Promise((resolve) => {
      try {
        this.unitOfWork.useTransaction(async () => {
          const actionInfo = await this.actionRepository.findOneBy({
            id: params.actionId,
          });
          if (!actionInfo) {
            throw new BusinessException(`No action ${params.actionId} found`);
          }
          actionInfo.intentionCount += 1;

          await this.intentionRepository.add(intentionRecord);
          await this.actionRepository.upsert(actionInfo, true, ['id']);
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

  async generateTransaction(
    data: GenerateTransactionParams,
  ): Promise<TransactionInfo[]> {
    const actionUrl = await this.findOneByCode(data.additionalData.code!);
    const { actionId, actionVersion } = actionUrl;
    const actionStore = this.actionService.getActionVersionStore(
      actionId,
      actionVersion,
    );

    try {
      return actionStore.generateTransaction(data);
    } catch (error) {
      this.logger.error(error);
      throw new BusinessException('Failed to generate transaction');
    }
  }
}
