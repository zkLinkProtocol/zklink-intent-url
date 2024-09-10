import { CrossChainSwapModule } from '@action/cross-chain-swap';
import { Module } from '@nestjs/common';
import { ActionUrlModule } from 'src/modules/actionUrl/actionUrl.module';

import { NewsService } from './news.service';

@Module({
  imports: [ActionUrlModule, CrossChainSwapModule],
  providers: [NewsService],
  exports: [NewsService, ActionUrlModule],
})
export class NewsModule {}
