import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { customAlphabet } from 'nanoid';

import {
  GenerateTransactionParams,
  GenerateTransactionResponse,
} from 'src/common/dto';
import { BusinessException } from 'src/exception/business.exception';
import { ActionService } from 'src/modules/action/action.service';
import { CreatorRepository, IntentionRepository } from 'src/repositories';
import { UnitOfWork } from 'src/unitOfWork';

import { ActionUrlAddRequestDto } from './dto/actionUrl.dto';

@Injectable()
export class ActionUrlService {
  logger: Logger;
  constructor(
    private readonly unitOfWork: UnitOfWork,
    private readonly intentionRepository: IntentionRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly actionService: ActionService,
  ) {
    this.logger = new Logger(ActionUrlService.name);
  }

  async findOneByCode(code: string) {
    const intention = await this.intentionRepository.getIntentionByCode(code);
    if (!intention) throw new BusinessException(`magicLink ${code} not found`);
    return intention;
  }

  async findListByCreator(
    creatorId: bigint,
    page: number = 1,
    limit: number = 20,
  ) {
    const offset = Math.max((page - 1) * limit, 0);
    const [intentions, total] =
      await this.intentionRepository.getIntentionsByCreator(
        creatorId,
        limit,
        offset,
      );

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
      throw new NotFoundException('Action not found');
    }

    if (!creator) {
      throw new UnauthorizedException('Creator not found');
    }
    const nanoid = customAlphabet(
      '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-',
      8,
    );
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
        this.logger.error(error, JSON.stringify({ params }));
        throw new Error('Failed to add actionUrl');
      }
    });
  }

  async updateByCode(code: string, params: any, creatorId: bigint) {
    const intention =
      await this.intentionRepository.queryIntentionWithoutRecordsByCode(code);
    if (!intention) {
      throw new NotFoundException(`ActionUrl ${code} not found`);
    }
    if (intention.creator.id !== creatorId) {
      throw new ForbiddenException('No permission');
    }
    intention.title = params.title;
    intention.description = params.description;
    intention.metadata = params.metadata;
    intention.settings = params.settings;

    try {
      await this.intentionRepository.updateByCode(code, intention);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to update actionUrl');
    }
    return code;
  }

  async updateActiveStatusByCode(code: string, creatorId: bigint) {
    const actionUrl =
      await this.intentionRepository.queryIntentionWithoutRecordsByCode(code);
    if (!actionUrl) {
      throw new NotFoundException('ActionUrl not found');
    }
    if (actionUrl.creator.id !== creatorId) {
      throw new UnauthorizedException('Not your own intent');
    }
    actionUrl.active = true;
    await this.intentionRepository.updateByCode(code, actionUrl);

    return code;
  }

  async deleteByCode(code: string, creatorId: bigint) {
    const actionUrl = await this.findOneByCode(code);
    if (!actionUrl) {
      throw new NotFoundException('ActionUrl not found');
    }
    if (actionUrl.creator.id !== creatorId) {
      throw new NotFoundException('ActionUrl not found');
    }
    try {
      await this.intentionRepository.deleteByCode(code);
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to delete actionUrl');
    }

    return true;
  }

  async generateTransaction(
    data: GenerateTransactionParams,
  ): Promise<GenerateTransactionResponse> {
    const actionUrl = await this.findOneByCode(data.additionalData.code!);
    const { action, actionVersion } = actionUrl;
    const actionStore = this.actionService.getActionVersionStore(
      action.id,
      actionVersion,
    );

    try {
      return actionStore.generateTransaction(data);
    } catch (error) {
      this.logger.error(
        `generateTransaction failed`,
        JSON.stringify({ data, error }),
      );
      throw new Error('Failed to generate transaction');
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
      throw new Error('Failed to generate transaction');
    }
  }
}
