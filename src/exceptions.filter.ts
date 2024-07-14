import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestData = {
      url: request.url,
      method: request.method,
      ip: request.ip,
      query: request.query,
      body: request.body,
    };

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || message;
    } else if (exception instanceof Error) {
      message = exception.message;
      // this.logger.error(
      //   `Request data  : ${JSON.stringify(requestData)} Error Message: ${message}`,
      //   exception.stack,
      // );
    }

    response.status(status).json({
      code: status,
      message: message,
      request: requestData,
      data: null,
    });
  }
}
