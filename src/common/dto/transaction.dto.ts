import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { Address } from 'src/types';

export class TransactionInfo {
  @ApiProperty({ description: 'The chain id of transaction' })
  chainId: number;

  @ApiProperty({ description: 'The to address of transaction' })
  to: string;

  @ApiProperty({
    description: 'The value of the transaction (including decimal)',
  })
  value: string;

  @ApiProperty({
    description: 'The data of the transaction',
  })
  data: string;

  @ApiProperty({
    description: 'dex router address',
  })
  dexContractAddress?: string;

  @ApiPropertyOptional({
    description:
      'Flag indicating whether the transaction should be sent on-chain',
  })
  @IsBoolean()
  shouldPublishToChain?: boolean = true;

  @ApiPropertyOptional({
    description: 'paymaster customData',
  })
  customData?: any;

  @ApiPropertyOptional({
    description: 'Token information required by the target chain',
  })
  requiredTokenAmount?: TokenAmount[];

  @ApiPropertyOptional({
    description: '',
  })
  isCommission?: boolean = false;
}

export class TokenAmount {
  @ApiProperty({ description: 'The token address of the target chain' })
  token: Address;

  @ApiProperty({
    description:
      'The number of tokens required by the target chain (including decimal)',
  })
  amount: string;
}
