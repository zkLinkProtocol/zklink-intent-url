import fs from 'fs';
import path from 'path';

import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import _ from 'lodash';

import { Action, ActionId } from 'src/common/dto';
import { ConfigType } from 'src/config';
import { BusinessException } from 'src/exception/business.exception';
import { ActionRepository } from 'src/repositories/action.repository';

import { ActionResponseDto } from './dto/actions.dto';
import { RegistryAction } from './model';

@Injectable()
export class ActionService implements OnApplicationBootstrap {
  private logger = new Logger(ActionService.name);
  private awsConfig: ConfigType['aws'];
  private uniqueActionPlugs: Array<RegistryAction>;

  constructor(
    private readonly actionRepository: ActionRepository,
    readonly configService: ConfigService,
    @Inject('ALL_ACTION_PLUGS')
    private readonly allActionPlugs: Array<RegistryAction>,
  ) {
    this.awsConfig = configService.get('aws', { infer: true })!;
  }

  onApplicationBootstrap() {
    this.uniqueActionPlugs = _.chain(this.allActionPlugs)
      .groupBy('id')
      .map((actions) => _.maxBy(actions, 'version'))
      .compact()
      .value();

    this.initializeActionsMetadata(this.uniqueActionPlugs);
    this.logger.log(`initializeActionsMetadata successfully`);
  }

  private async initializeActionsMetadata(actionPlugs: Array<RegistryAction>) {
    for (const { id, service } of actionPlugs) {
      const metadata = await service.getMetadata();

      if (!metadata.logo) {
        const logos = fs.readdirSync(path.join(process.cwd(), 'assets/logos'));
        const logoWithExt = logos.find((file) => {
          const fileName = path.basename(file, path.extname(file));
          return fileName === id;
        });
        metadata.logo = `${this.awsConfig.s3Url}/${this.awsConfig.keyPrefix}/logos/${logoWithExt ?? 'zklink.png'}`;
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
    const actionStore = this.uniqueActionPlugs.find((plug) => plug.id === id);

    if (!actionStore) {
      throw new BusinessException(`Action with id '${id}' not found.`);
    }
    return actionStore.service;
  }

  getActionVersionStore(id: ActionId, version: string): Action {
    const actionStore = this.allActionPlugs.find(
      (plug) => plug.id === id && plug.version === version,
    );
    if (!actionStore) {
      throw new BusinessException(
        `ActionVersion with id '${id}' version ${version} not found.`,
      );
    }
    return actionStore.service;
  }
}
