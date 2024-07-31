import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { ContractTransaction, JsonRpcProvider } from 'ethers';

export class GeneratedTransaction {
  @ApiProperty({ description: 'The transaction request object' })
  tx: ContractTransaction;

  @ApiProperty({ description: 'The transaction request object' })
  provider: JsonRpcProvider;

  @ApiProperty({
    description: 'Flag indicating whether the transaction should be sent',
  })
  @IsBoolean()
  shouldSend: boolean;

  @ApiPropertyOptional({
    description: 'Cross-chain transfer amount',
  })
  @IsString()
  crossChainAmount?: string;
}
