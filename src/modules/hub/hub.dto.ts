import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HubRequestDto {
  @ApiProperty({
    name: 'data',
    description: 'data',
    example: '4a80-aa5d-c562147eff32',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  data: string;
}
