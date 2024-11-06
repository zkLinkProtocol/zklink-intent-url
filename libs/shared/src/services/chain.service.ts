import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonRpcProvider } from 'ethers';

import { NetworkDto, OptionDto } from 'src/common/dto';
import { ConfigType } from 'src/config';
import { Chains } from 'src/constants';

@Injectable()
export class ChainService {
  private readonly chains: ConfigType['chains'];
  private readonly chainsMapping: Map<number, ConfigType['chains'][number]>;
  private readonly logger = new Logger(ChainService.name);
  constructor(private readonly configService: ConfigService) {
    this.chains = this.configService.get('chains', { infer: true })!;
    this.chainsMapping = new Map(
      this.chains.map((chain) => [chain.chainId, chain]),
    );
  }

  public buildTransactionExplorerLink(hash: string, chainId: number) {
    const chainConfig = this.chainsMapping.get(chainId);
    if (!chainConfig) {
      this.logger.error(`chain ${chainId} not supported`);
      throw new Error(`chain ${chainId} not supported`);
    }

    return `${chainConfig.explorer}/tx/${hash}`;
  }

  public buildChainOptions(chains: Chains[]): OptionDto[] {
    return chains.map((chain) => {
      const chainInfo = this.chainsMapping.get(chain);
      if (!chainInfo) {
        throw new Error(`chain config: ${chain} not found`);
      }
      return {
        label: chainInfo.name,
        value: chainInfo.chainId.toString(),
      };
    });
  }

  /**
   * 根据action里面的配置顺序返回
   */
  public buildSupportedNetworks(chains: Chains[]): NetworkDto[] {
    return chains.map((chain) => {
      const chainInfo = this.chainsMapping.get(chain);
      if (!chainInfo) {
        throw new Error(`chain config: ${chain} not found`);
      }
      return {
        name: chainInfo.name,
        chainId: chainInfo.chainId,
      };
    });
  }

  public getProvider(chainId: number) {
    const chainConfig = this.chainsMapping.get(chainId);
    if (!chainConfig) {
      this.logger.error(`chain ${chainId} not supported`);
      throw new Error(`chain ${chainId} not supported`);
    }

    if (chainConfig.rpc.length === 0) {
      this.logger.error(`missing rpc config on ${chainId}`);
      throw new Error(`missing rpc config on ${chainId}`);
    }

    return new JsonRpcProvider(chainConfig.rpc[0]);
  }
}
