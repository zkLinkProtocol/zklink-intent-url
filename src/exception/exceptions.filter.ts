import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { BusinessException } from './business.exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BusinessException) {
      exception.handleResponse(response);
    } else if (exception instanceof HttpException) {
      const status = HttpStatus.BAD_REQUEST;
      response.status(status).json({
        code: status,
        message: exception.message,
        data: null,
      });
    } else if (exception instanceof Error) {
      const status = HttpStatus.BAD_REQUEST;
      const message = exception.message;
      const request = ctx.getRequest<Request>();
      const requestData = {
        url: request.url,
        method: request.method,
        ip: request.ip,
        query: request.query,
        body: request.body,
      };
      this.logger.error(
        `Request data  : ${JSON.stringify(requestData)} Error Message: ${message}`,
        exception.stack,
      );

      response.status(status).json({
        code: status,
        message: message,
        data: null,
      });
    }
  }
}
