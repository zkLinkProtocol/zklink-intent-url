import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';

import { GenerateTransactionParams } from 'src/common/dto';

import { ActionUrlService } from './actionUrl.service';

@Injectable()
export class BlinkService {
  logger: Logger;
  constructor(private readonly actionUrlService: ActionUrlService) {
    this.logger = new Logger(BlinkService.name);
  }

  magicLinkToBlinkActions(postHref: string, setting: any) {
    const componentsArr = setting.intentInfo.components;
    const components = new Map();
    const params = new Map();
    componentsArr.forEach((item: any) => {
      params.set(item.name, item.value);
      components.set(item.name, item);
      // params.set(item.label, item.value);
      // components.set(item.label, item);
    });
    const intentList = setting.intentList;
    let actions = [];
    if (intentList && intentList.length > 0) {
      actions = intentList.map((item: any, index: number) => {
        let res: any = {};
        if (item.type == 'Button') {
          if (undefined != item.value) {
            params.set(item.field, item.value);
          }
          res = {
            index,
            href: '',
            label: item.title,
          };
        } else if (item.type == 'Input') {
          params.set(item.field, `{${item.field}}`);
          const component = components.get(item.field);
          if (component) {
            res = {
              index,
              href: '',
              label: item.title,
              parameters: [
                {
                  // name: component.label,
                  name: component.name,
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
        res.href =
          postHref.indexOf('?') != -1
            ? `${postHref}${paramsStr.substring(0, paramsStr.length - 1)}`
            : `${postHref}?${paramsStr.substring(0, paramsStr.length - 1)}`;
        return res;
      });
    }
    return actions;
  }

  async getMetadataActions(code: string, setting: any) {
    const postHref = `/api/action-url/${code}/build-transactions`;
    return this.magicLinkToBlinkActions(postHref, setting);
  }

  async buildTransactions(
    chainId: number,
    code: string,
    account: string,
    params: any,
  ): Promise<string> {
    const data: GenerateTransactionParams = {
      additionalData: {
        chainId,
        code,
        account,
      },
      formData: params,
    };
    const result = await this.actionUrlService.generateTransaction(data);
    this.logger.log(
      `blink : buildTransactions : result: ${JSON.stringify(result)}`,
    );
    if (!result || result.length == 0) {
      return '';
    }
    const tx = result[0];
    const transaction = new ethers.Transaction();
    transaction.chainId = tx.chainId;
    transaction.to = tx.to;
    transaction.value = tx.value;
    transaction.data = tx.data;
    transaction.type = 0;
    return transaction.unsignedSerialized;
  }
}
