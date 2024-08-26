import { Controller, Get, RequestMapping, RequestMethod } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';

@ApiTags('actions.json')
@Controller('')
export class ActionsJsonController extends BaseController {
  constructor() {
    super();
  }

  @RequestMapping({ path: 'actions.json', method: RequestMethod.GET })
  @CommonApiOperation('actions.json')
  async getActions() {
    const actions = {
      rules: [
        {
          pathPattern: '/action-url/*',
          apiPath: '/api/action-url/*/metadata',
        },
      ],
    };
    return actions;
  }
}
