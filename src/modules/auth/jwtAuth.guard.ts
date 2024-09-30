import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { OptionLogin } from './creator.decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err: Error, user: any, info: Error, context: ExecutionContext) {
    const optionLogin = this.reflector.get(OptionLogin, context.getHandler());
    if (optionLogin) {
      return user;
    }

    if (err || !user) {
      const errorResponse = {
        code: 401,
        message: 'Unauthorized access',
        data: null,
      };

      if (info instanceof Error) {
        switch (info.name) {
          case 'TokenExpiredError':
            errorResponse.message = 'Token has expired';
            break;
          case 'JsonWebTokenError':
            errorResponse.message = info.message;
            break;
          case 'NotBeforeError':
            errorResponse.message = 'Token is not active yet';
            break;
          default:
            errorResponse.message = 'Authentication error';
        }
      }
      throw new UnauthorizedException(errorResponse);
    }
    return user;
  }
}
