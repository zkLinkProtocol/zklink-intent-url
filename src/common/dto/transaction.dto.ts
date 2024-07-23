import { ApiProperty } from '@nestjs/swagger';
import { ContractTransaction, JsonRpcProvider } from 'ethers';

export class GeneratedTransaction {
  @ApiProperty({ description: 'The transaction request object' })
  tx: ContractTransaction;

  @ApiProperty({ description: 'The transaction request object' })
  provider: JsonRpcProvider;

  @ApiProperty({
    description: 'Flag indicating whether the transaction should be sent',
  })
  shouldSend: boolean;
}
