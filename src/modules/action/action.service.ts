import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BuyMeACoffeeService } from '@action/buy-me-a-coffee';
import { CrossChainSwapService } from '@action/cross-chain-swap';
import { NovaswapService } from '@action/novaswap';
import { RedEnvelopeService } from '@action/red-envelope';
import {
  Action,
  ActionId,
  GenerateTransactionData,
  GeneratedTransaction,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
import { BusinessException } from 'src/exception/business.exception';
import { ActionRepository } from 'src/repositories/action.repository';

import { ActionResponseDto } from './dto/actions.dto';

@Injectable()
export class ActionService {
  private awsConfig: ConfigType['aws'];
  private allActionStore: Map<ActionId, Action> = new Map();

  constructor(
    private readonly actionRepository: ActionRepository,
    readonly configService: ConfigService,
    readonly redEnvelopeService: RedEnvelopeService,
    readonly novaswapService: NovaswapService,
    readonly buyMeACoffeeService: BuyMeACoffeeService,
    readonly crossChainSwapService: CrossChainSwapService,
  ) {
    this.awsConfig = configService.get('aws', { infer: true })!;
    const allServiceConfig = [
      { id: 'red-envelope', service: redEnvelopeService },
      { id: 'novaswap', service: novaswapService },
      { id: 'buy-me-a-coffee', service: buyMeACoffeeService },
      { id: 'cross-chain-swap', service: crossChainSwapService },
    ];
    this.initializeActionsMetadata(allServiceConfig);
    allServiceConfig.forEach((action) => {
      this.allActionStore.set(action.id, action.service);
    });
  }

  private async initializeActionsMetadata(
    actionList: Array<{ id: string; service: Action }>,
  ) {
    for (const { id, service } of actionList) {
      const metadata = await service.getMetadata();

      if (!metadata.logo) {
        const logos = fs.readdirSync(path.join(process.cwd(), 'assets/logos'));
        const logo = logos.find((file) => {
          const fileName = path.basename(file, path.extname(file));
          return fileName === id;
        });
        metadata.logo = `${this.awsConfig.s3Url}/${this.awsConfig.keyPrefix}/logos/${logo}`;
      }

      const { title, logo, description, networks, intent, dApp, author } =
        metadata;

      const newAction = this.actionRepository.create({
        id: id,
        title: title,
        logo: logo,
        networks: networks,
        description: description,
        author: author,
        dApp: dApp,
        intent: intent,
      });
      await this.actionRepository.initAction(newAction);
    }
  }

  async getActionMetadata(id: ActionId) {
    const actionMetadata = await this.actionRepository.findOne({
      where: { id },
    });
    if (!actionMetadata) {
      throw new BusinessException(`ActionId ${id} not found`);
    }
    const actionStore = await this.getActionStore(id);
    const hasPostTxs = !!actionStore.afterActionUrlCreated;
    return { ...actionMetadata, hasPostTxs };
  }

  async getAllActionMetadata(): Promise<ActionResponseDto[]> {
    const allActionMetadataRaw = await this.actionRepository.find({});
    const allActionMetadata = allActionMetadataRaw.map(
      async (actionMetadata) => {
        const { id } = actionMetadata;
        const actionStore = await this.getActionStore(id);
        const hasPostTxs = !!actionStore.afterActionUrlCreated;
        return { ...actionMetadata, hasPostTxs };
      },
    );
    return Promise.all(allActionMetadata);
  }

  getActionStore(id: ActionId): Action {
    const actionStore = this.allActionStore.get(id);
    if (!actionStore) {
      throw new BusinessException(`Action with id '${id}' not found.`);
    }
    return actionStore;
  }

  generateTransaction(
    id: ActionId,
    data: GenerateTransactionData,
  ): Promise<GeneratedTransaction> {
    const actionStore = this.getActionStore(id);
    if (!actionStore) {
      throw new BusinessException(`Action with id '${id}' not found.`);
    }
    return actionStore.generateTransaction(data);
  }
}
