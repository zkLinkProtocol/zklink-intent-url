import {
  BadRequestException,
  UsePipes,
  ValidationPipe,
  applyDecorators,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

export function CommonApiOperation(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBadRequestResponse({ description: '{ "code": 400, "message": "Service exception", "data":null }' }), // prettier-ignore
    UsePipes(
      new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
          return new BadRequestException({
            code: 400,
            message: errors
              .map((error) => Object.values(error.constraints || {}))
              .join(','),
            data: null,
          });
        },
      }),
    ),
  );
}
