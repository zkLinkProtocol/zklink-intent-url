import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import { ActionService } from '../action/action.service';

@Injectable()
export class BlinkService {
  logger: Logger;
  constructor(private readonly actionService: ActionService) {
    this.logger = new Logger(BlinkService.name);
  }

  async getMetadataActions(code: string, setting: any) {
    const postHref = `/api/action-url/${code}/build-transactions`;

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
        let res: any = {};
        if (item.type == 'Button') {
          if (undefined != item.value) {
            params.set(item.field, item.value);
          }
          res = {
            href: '',
            label: item.title,
          };
        } else if (item.type == 'Input') {
          params.set(item.field, `{${item.field}}`);
          const component = components.get(item.field);
          if (component) {
            res = {
              href: '',
              label: item.title,
              parameters: [
                {
                  name: component.label,
                  // name: component.name,
                  label: component.label,
                  required: true,
                },
              ],
            };
          }
        }

        let paramsStr = '';
        params.forEach((value, key) => {
          paramsStr += `${key}=${value}&`;
        });
        res.href = `${postHref}?${paramsStr.substring(0, paramsStr.length - 1)}`;
        return res;
      });
    }
    return actions;
  }

  async buildTransactions(
    code: string,
    actionId: string,
    sender: string,
    params: any,
  ): Promise<string> {
    const data = {
      code,
      sender,
      params,
    };
    const result = await this.actionService.generateTransaction(actionId, data);
    if (!result || result.txs.length == 0) {
      return '';
    }
    const tx = result.txs[0];
    const transaction = new ethers.Transaction();
    transaction.chainId = tx.chainId;
    transaction.to = tx.to;
    transaction.value = tx.value;
    transaction.data = tx.data;
    return transaction.serialized;
  }
}
