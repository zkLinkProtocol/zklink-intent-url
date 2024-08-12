import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

class Creator {
  @ApiProperty({
    name: 'name',
    description: 'Name of creator.',
    example: 'julie',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

// request dto
export class ActionUrlAddRequestDto {
  @ApiProperty({
    name: 'actionId',
    description: 'Action id.',
    example: 'swap',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  actionId: string;

  @ApiProperty({
    name: 'title',
    description: 'Title of the actionUrl.',
    example: 'swapEthToUsdt',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the actionUrl.',
    example: 'Swap 1 ETH for 3000 USDT using NovaSwap.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    name: 'metadata',
    description: 'Share image for actionUrl.',
    example: 'https://host.com/image.png',
  })
  @IsString()
  metadata: string;

  @ApiProperty({
    name: 'settings',
    description: 'Configuration options for actionUrl.',
    example: { params1: 1, type: 'input' },
  })
  @IsNotEmpty()
  @IsObject()
  settings: object;
}

export class ActionUrlUpdateRequestDto extends ActionUrlAddRequestDto {}

// response dto
export class ActionUrlFindOneResponseDto extends ActionUrlAddRequestDto {
  @ApiProperty({
    name: 'creator',
    description: 'Creator info.',
    example: Creator,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: any;
}
