import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

import { Settings } from 'src/types';

// request dto
export class SendNewsOriginRequestDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the news.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'Description of the news.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    name: 'metadata',
    description: 'Metadata of the news.',
    required: true,
  })
  metadata: string;

  @ApiProperty({
    name: 'fromTokenAddress',
    description: 'Address of from token.',
    required: true,
  })
  fromTokenAddress: string;

  @ApiProperty({
    name: 'toTokenAddress',
    description: 'Address of to token.',
    required: true,
  })
  toTokenAddress: string;

  @ApiProperty({
    name: 'settings',
    description: 'Configuration options for news.',
  })
  @IsNotEmpty()
  @IsObject()
  settings: Settings;
}
