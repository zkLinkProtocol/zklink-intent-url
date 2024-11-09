import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TokenInfoDto {
  @ApiProperty({ description: 'The token address' })
  @IsString()
  tokenAddress: string;

  @ApiProperty({
    description: 'The amount of tokens (raw data, with decimals)',
  })
  @IsString()
  amount: string;

  @ApiPropertyOptional({
    description: 'The direction of token transfer (from or to)',
  })
  @IsString()
  @IsOptional()
  direction?: 'from' | 'to';
}

class DisplayInfoDto {
  @ApiProperty({
    type: [TokenInfoDto],
    description: 'Array of token information',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TokenInfoDto)
  tokens: TokenInfoDto[];
}

export class TransactionInfoDto {
  @ApiProperty({ description: 'The chain id of transaction' })
  @IsNumber()
  @IsNotEmpty()
  chainId: number;

  @ApiProperty({ description: 'The to address of transaction' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'The value of the transaction (including decimal)',
  })
  @IsString()
  value: string;

  @ApiProperty({ description: 'The data of the transaction' })
  @IsString()
  data: string;

  @ApiPropertyOptional({ description: 'dex router address' })
  @IsString()
  @IsOptional()
  dexContractAddress?: string;

  @ApiPropertyOptional({
    description:
      'Flag indicating whether the transaction should be sent on-chain',
  })
  @IsBoolean()
  @IsOptional()
  shouldPublishToChain?: boolean = true;

  @ApiPropertyOptional({ description: 'paymaster customData' })
  @IsOptional()
  customData?: any;

  @ApiPropertyOptional({
    description: 'Token information required by the target chain',
  })
  @IsOptional()
  requiredTokenAmount?: any;

  @ApiPropertyOptional({ description: 'Optional flag' })
  @IsBoolean()
  @IsOptional()
  optional?: boolean = false;
}

export class GenerateTransactionDto {
  @ApiPropertyOptional({
    type: DisplayInfoDto,
    description: 'Display information about tokens',
  })
  @ValidateNested()
  @Type(() => DisplayInfoDto)
  @IsOptional()
  displayInfo?: DisplayInfoDto;

  @ApiProperty({
    type: [TransactionInfoDto],
    description: 'Array of transactions',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionInfoDto)
  transactions: TransactionInfoDto[];
}
