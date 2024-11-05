import { OKXService } from '@core/shared';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('okx-bridge')
export class OkxBridgeController {
  constructor(private readonly okxService: OKXService) {}

  @Get('/tx/status')
  public async getStatus(
    @Query('hash') hash: string,
    @Query('fromChainId') fromChainId: string,
  ) {
    return await this.okxService.getBridgeTxReceipt(hash, Number(fromChainId));
  }
}
