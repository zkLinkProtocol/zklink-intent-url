import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return {};
        return JSON.parse(
          JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
          ),
        );
      }),
    );
  }
}
