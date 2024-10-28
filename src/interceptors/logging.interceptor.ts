import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  private readonly threshold; // Threshold in milliseconds

  constructor(private configService: ConfigService) {
    this.threshold = Number(
      configService.get<number>('SLOW_INTERFACE_LOGGING_THRESHOLD') || 2500,
    );
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const body = request.body;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        if (duration > this.threshold) {
          this.logger.warn(
            `Slow Request: ${method} ${url} - Body: ${JSON.stringify(body)}, took ${duration}ms`,
          );
        }
      }),
    );
  }
}
