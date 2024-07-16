import { ApiProperty } from '@nestjs/swagger';
import { ActionMetadata } from 'src/common/dto';

export class ActionResponseDto extends ActionMetadata {
  @ApiProperty({
    type: String,
    description: 'action id',
    example: 'example',
  })
  public readonly id: string;
}
