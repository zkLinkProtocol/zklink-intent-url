import { NovaswapModule } from '@action/novaswap';
import { SharedModule } from '@core/shared';
import { Module } from '@nestjs/common';
import { TgbotModule } from 'src/modules/tgbot/tgbot.module';

import { OkxBridgeController } from './okxBridge.controller';
import { OkxBridgeService } from './okxBridge.service';

@Module({
  imports: [NovaswapModule, TgbotModule, SharedModule],
  providers: [OkxBridgeService],
  exports: [OkxBridgeService],
  controllers: [OkxBridgeController],
})
export class OkxBridgeModule {}
