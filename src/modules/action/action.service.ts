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

import { Action } from 'src/common/dto';
import { ConfigType } from 'src/config';
import { BusinessException } from 'src/exception/business.exception';
import { ActionRepository } from 'src/repositories/action.repository';
import { ActionId } from 'src/types';

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
      .map((actions) =>
        _.maxBy(actions, (action) => parseInt(action.version.substring(1), 10)),
      )
      .compact()
      .value();

    this.initializeActionsMetadata(this.uniqueActionPlugs);
    this.logger.log(`initializeActionsMetadata successfully`);
  }

  private async initializeActionsMetadata(actionPlugs: Array<RegistryAction>) {
    for (const [index, { id, service }] of actionPlugs.entries()) {
      const metadata = await service.getMetadata();

      if (!metadata.logo) {
        const logos = fs.readdirSync(path.join(process.cwd(), 'assets/logos'));
        const logoWithExt = logos.find((file) => {
          const fileName = path.basename(file, path.extname(file));
          return fileName === id;
        });
        metadata.logo = `${this.awsConfig.s3Url}/${this.awsConfig.keyPrefix}/logos/${logoWithExt ?? 'zklink.png'}`;
      }

      if (!metadata.magicLinkMetadata?.gallery) {
        const logos = fs.readdirSync(
          path.join(process.cwd(), 'assets/galleries'),
        );
        const galleryWithExt = logos.find((file) => {
          const fileName = path.basename(file, path.extname(file));
          return fileName === id;
        });
        metadata.magicLinkMetadata = metadata.magicLinkMetadata ?? {};
        metadata.magicLinkMetadata.gallery = galleryWithExt
          ? `${this.awsConfig.s3Url}/${this.awsConfig.keyPrefix}/galleries/${galleryWithExt}`
          : '';
      }

      const {
        title,
        logo,
        description,
        networks,
        intent,
        author,
        magicLinkMetadata,
      } = metadata;

      const newAction = this.actionRepository.create({
        id,
        title,
        logo,
        networks,
        description,
        author,
        intent,
        magicLinkMetadata,
        sortOrder: index,
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
    const actionStore = this.getActionStore(id);
    const metadata = await actionStore.getMetadata();
    const hasPostTxs = !!actionStore.onMagicLinkCreated;
    if (metadata.maxCommission) {
      return {
        ...actionMetadata,
        maxCommission: metadata.maxCommission,
        hasPostTxs,
      };
    }
    return {
      ...actionMetadata,
      hasPostTxs,
    };
  }

  public async checkActionWhitelist(actionId: string, account?: string) {
    const actionStore = this.getActionStore(actionId);
    const metadata = await actionStore.getMetadata();

    if (!metadata.whiteList) {
      return true;
    }

    if (metadata.whiteList.length > 0 && account) {
      return metadata.whiteList
        .map((address) => address.toLowerCase())
        .includes(account.toLowerCase());
    }

    if (metadata.whiteList.length > 0 && !account) {
      return false;
    }

    return true;
  }

  async getAllActionMetadata(account: string) {
    const allActionMetadataRaw = await this.actionRepository.getAllActions();
    const allActionMetadata = await Promise.all(
      allActionMetadataRaw.map(async (actionMetadata) => {
        const {
          id,
          logo,
          title,
          networks,
          description,
          author,
          intentionRecords,
          intentions,
        } = actionMetadata;
        const actionStore = this.getActionStore(id);
        if (!(await this.checkActionWhitelist(id, account))) {
          return;
        }

        const hasPostTxs = !!actionStore.onMagicLinkCreated;

        return {
          id,
          logo,
          title,
          networks,
          description,
          author,
          intentionCount: intentions.length,
          interaction: intentionRecords.length,
          hasPostTxs,
        };
      }),
    );
    return await allActionMetadata.filter((item) => !!item);
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
