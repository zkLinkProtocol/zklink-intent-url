import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

import { AuthorDto } from 'src/common/dto';

class CreatorDto {
  @ApiProperty({
    name: 'address',
    description: 'address of creator.',
    example: '0xbE3d310ab2d...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
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
export class ActionUrlFindOneResponseDto extends OmitType(
  ActionUrlAddRequestDto,
  ['actionId'],
) {
  @ApiProperty({
    name: 'creator',
    description: 'Creator info.',
    example: CreatorDto,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: any;
}

export class ActionUrlResponseDto extends OmitType(ActionUrlAddRequestDto, [
  'actionId',
] as const) {
  @ApiProperty({
    name: 'logo',
    description: 'Action Logo',
    example:
      'https://zklink-intent.s3.ap-northeast-1.amazonaws.com/dev/logos/red-envelope.png',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  logo: string;

  @ApiProperty({
    name: 'code',
    description: 'Action URL code',
    example: 'ki2a902s',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    name: 'code',
    description: 'Action URL code',
    example: {
      name: 'zklink',
      github: 'https://github.com/zkLinkProtocol',
      x: '',
    },
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  actionAuthor: AuthorDto;

  @ApiProperty({
    name: 'creator',
    description: 'Creator info.',
    example: {
      address: '0xbE3d310ab2d...',
    },
    required: true,
  })
  @IsObject()
  creator: CreatorDto;

  @ApiProperty({
    name: 'interaction',
    description: 'Intention interaction count',
    example: 20,
    required: true,
  })
  @IsNumber()
  interaction: number;
}
