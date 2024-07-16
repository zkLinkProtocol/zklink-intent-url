import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class BusinessException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }

  handleResponse(response: Response<any, Record<string, any>>) {
    const status = this.getStatus();
    response.status(status).json({
      code: status,
      message: this.message,
      data: null,
    });
  }
}
