import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { ActionMetadata } from 'src/common/dto';

export class ActionResponseDto extends ActionMetadata<string> {
  @ApiProperty({
    type: String,
    description: 'action id',
    example: 'example',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  @IsBoolean()
  hasPostTxs: boolean;
}
