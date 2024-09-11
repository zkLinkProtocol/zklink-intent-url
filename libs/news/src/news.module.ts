import { NovaswapModule } from '@action/novaswap';
import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { NewsService } from './news.service';

@Module({
  imports: [ActionUrlModule, NovaswapModule],
  providers: [NewsService],
  exports: [NewsService, ActionUrlModule],
})
export class NewsModule {}
