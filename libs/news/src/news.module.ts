import { NovaswapModule } from '@action/novaswap';
import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';
import { TgbotModule } from 'src/modules/tgbot/tgbot.module';

import { NewsService } from './news.service';

@Module({
  imports: [NovaswapModule, TgbotModule, SharedModule],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
