import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

import { AuthorDto, NetworkDto } from 'src/common/dto';

export class ActionResponseDto {
  @ApiProperty({
    type: String,
    description: 'action id',
    example: 'example',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  logo: string;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  title: string;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  networks: NetworkDto[];

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  description: string;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  author: AuthorDto;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  intentionCount: number;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  interaction: number;

  @ApiProperty({
    description: 'If we should send tx after create txs',
  })
  @IsBoolean()
  hasPostTxs: boolean;
}
