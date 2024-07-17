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
        message: 'succdess',
        data: data,
      };
    } else {
      return {
        code: 200,
        message: 'succdess',
        meta: meta,
        data: data,
      };
    }
  }

  protected async error(
    errmsg: string,
    code: number = 500,
  ): Promise<ResponseDto<null>> {
    return {
      code,
      message: errmsg,
      data: null,
    };
  }
}
