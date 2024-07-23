import { Module } from '@nestjs/common';

import { UnitOfWork } from './unitOfWork.provider';
import { MetricsModule } from '../metrics';

@Module({
  imports: [MetricsModule],
  providers: [UnitOfWork],
  exports: [UnitOfWork],
})
export class UnitOfWorkModule {}
