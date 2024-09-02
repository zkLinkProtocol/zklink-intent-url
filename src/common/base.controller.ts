import { Controller } from '@nestjs/common';

import { PagingMetaDto, ResponseDto } from 'src/common/response.dto';

@Controller()
export class BaseController {
  protected async success<T>(
    data: T,
    meta?: PagingMetaDto,
  ): Promise<ResponseDto<T>> {
    if (!meta) {
      return {
        code: 200,
        message: 'success',
        data: data,
      };
    } else {
      return {
        code: 200,
        message: 'success',
        meta: meta,
        data: data,
      };
    }
  }

  protected async error(errMsg: string, code: number = 500) {
    return {
      code,
      message: errMsg,
      data: null,
    };
  }
}
