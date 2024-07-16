import { ApiProperty } from '@nestjs/swagger';
import { TransactionRequest } from 'ethers';

export class GeneratedTransaction {
  @ApiProperty({ description: 'The transaction request object' })
  tx: TransactionRequest;

  @ApiProperty({
    description: 'Flag indicating whether the transaction should be sent',
  })
  shouldSend: boolean;
}
