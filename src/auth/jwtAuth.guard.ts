import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
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
