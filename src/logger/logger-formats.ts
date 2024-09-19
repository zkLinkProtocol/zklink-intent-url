import { ClsServiceManager } from 'nestjs-cls';
import * as winston from 'winston';

const traceIdFormat = winston.format((info) => {
  const cls = ClsServiceManager.getClsService();
  info.traceId = cls.getId() || 'no-trace';
  return info;
});

export const developmentFormat = winston.format.combine(
  traceIdFormat(),
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    ({ timestamp, level, message, context, traceId, stack }) => {
      let log = `${timestamp} [${traceId}] [${context || 'App'}] ${level}: ${message}`;
      if (stack) {
        log += `\nStack trace:\n${stack}`;
      }
      return log;
    },
  ),
);

export const productionFormat = winston.format.combine(
  traceIdFormat(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);
