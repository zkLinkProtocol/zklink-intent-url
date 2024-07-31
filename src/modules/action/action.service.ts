import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  Action,
  ActionId,
  ActionTransactionParams,
  GeneratedTransaction,
} from 'src/common/dto';
import { ConfigType } from 'src/config';
import { BusinessException } from 'src/exception/business.exception';

import { ActionResponseDto } from './dto/actions.dto';

@Injectable()
export class ActionService {
  private awsConfig: ConfigType['aws'];
  constructor(configService: ConfigService) {
    this.awsConfig = configService.get('aws');
  }
  private actions: Map<ActionId, Action> = new Map();

  setActions(actions: Map<ActionId, Action>) {
    this.actions = actions;
  }

  private async getActionMetadata(id: ActionId) {
    const action = this.actions.get(id);
    const actionMetadata = await action.getMetadata();
    if (!actionMetadata.logo) {
      const logos = fs.readdirSync(path.join(process.cwd(), 'assets/logos'));
      const logo = logos.find((file) => {
        const fileName = path.basename(file, path.extname(file));
        return fileName === id;
      });
      actionMetadata.logo = `${this.awsConfig.s3Url}/${this.awsConfig.keyPrefix}/logos/${logo}`;
    }
    return actionMetadata;
  }

  async getActions(): Promise<ActionResponseDto[]> {
    const actions = Array.from(this.actions.keys()).map(async (id) => {
      const metadata = await this.getActionMetadata(id);
      return { id, ...metadata };
    });
    return Promise.all(actions);
  }

  async getAction(id: ActionId): Promise<ActionResponseDto | null> {
    const metadata = await this.getActionMetadata(id);

    return metadata ? { id, ...metadata } : null;
  }

  async generateTransaction(
    id: ActionId,
    params: ActionTransactionParams,
  ): Promise<GeneratedTransaction> {
    const action = this.actions.get(id);
    if (!action) {
      throw new BusinessException(`Action with id '${id}' not found.`);
    }
    return action.generateTransaction(params);
  }
}
