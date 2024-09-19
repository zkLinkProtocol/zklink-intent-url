import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

import { developmentFormat, productionFormat } from './logger-formats';

const isProduction = process.env.NODE_ENV === 'production';

export default WinstonModule.createLogger({
  level: isProduction ? 'info' : 'debug',
  transports: [
    new transports.Console({
      format: isProduction ? productionFormat : developmentFormat,
    }),
  ],
});
