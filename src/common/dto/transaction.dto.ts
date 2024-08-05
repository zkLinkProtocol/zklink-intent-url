import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { ContractTransaction, JsonRpcProvider } from 'ethers';

export class Tx {
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
    description: 'Transaction parameters',
  })
  dataObject: object;
}

export class Token {
  @ApiProperty({ description: 'The chain id of the target chain' })
  chainId: number;

  @ApiProperty({ description: 'The token address of the target chain' })
  token: string;

  @ApiProperty({
    description:
      'The number of tokens required by the target chain (including decimal)',
  })
  amount: string;
}

export class GeneratedTransaction {
  @ApiProperty({ description: 'The transaction request object' })
  txs: Tx[];

  @ApiProperty({
    description: 'Token information required by the target chain',
  })
  tokens: Token[];

  @ApiProperty({ description: 'The provider of transaction' })
  provider: JsonRpcProvider;

  @ApiProperty({
    description: 'Flag indicating whether the transaction should be sent',
  })
  @IsBoolean()
  shouldSend: boolean;
}
