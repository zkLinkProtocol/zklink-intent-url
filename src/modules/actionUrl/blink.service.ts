import { Injectable, Logger } from '@nestjs/common';

import { BusinessException } from 'src/exception/business.exception';

import { ActionUrlService } from './actionUrl.service';
import { ActionService } from '../action/action.service';

@Injectable()
export class BlinkService {
  logger: Logger;
  constructor(
    private readonly actionUrlService: ActionUrlService,
    private readonly actionService: ActionService,
  ) {
    this.logger = new Logger(BlinkService.name);
  }

  async getMetadata(code: string) {
    const result = await this.actionUrlService.findOneByCode(code);
    if (!result) {
      throw new BusinessException('Action not found');
    }
    const postHref = `/api/action-url/${code}/build-transactions`;
    const setting: any = result.settings;

    const componentsArr = setting.intentInfo.components;
    const components = new Map();
    const params = new Map();
    componentsArr.forEach((item: any) => {
      // params.set(item.name, item.value);
      // components.set(item.name, item);
      params.set(item.label, item.value);
      components.set(item.label, item);
    });
    const intentList = setting.intentList;
    let actions = [];
    if (intentList && intentList.length > 0) {
      actions = intentList.map((item: any) => {
        if (item.type == 'Button') {
          if (!('' == item?.field ?? '')) {
            params.set(item.field, item.value);
          }
          let paramsStr = '';
          params.forEach((value, key) => {
            paramsStr += `${key}=${value}&`;
          });
          return {
            href: `${postHref}?${paramsStr.substring(0, paramsStr.length - 1)}`,
            label: item.title,
          };
        } else if (item.type == 'Input') {
          const component = components.get(item.field);
          if (component) {
            return {
              href: postHref,
              label: item.title,
              parameters: [
                {
                  name: component.name,
                  label: component.label,
                  required: true,
                },
              ],
            };
          }
        }
      });
    }

    const metadata = {
      icon: result.metadata,
      title: result.title,
      description: result.description,
      label: '',
      disable: false,
      error: {
        message: '',
      },
      links: {
        actions,
      },
    };
    return metadata;
  }

  async buildTransactions(code: string, params: any) {
    const result = await this.actionUrlService.findOneByCode(code);
    if (!result) {
      throw new BusinessException('Action not found');
    }
    const actionId = result.actionId;
    const chainId = (result.settings as any)?.intentInfo?.network?.chainId ?? 0;
    if (chainId == 0) {
      throw new BusinessException(
        'buildTransactions: code : ${code}, ChainId not found',
      );
    }
    params.chainId = chainId;
    const data = {
      code,
      sender: result.creator.address,
      params,
    };
    return await this.actionService.generateTransaction(actionId, data);
  }
}
