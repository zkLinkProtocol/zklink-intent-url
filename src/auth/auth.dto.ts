import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// request dto
export class LoginByPasskeyRequestDto {
  @ApiProperty({
    name: 'publickey',
    description: "Passkey's public key or public address.",
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  publickey: string;

  @ApiProperty({
    name: 'message',
    description: 'Sign message.',
    example: 'hello intent',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({
    name: 'signature',
    description: 'Signed string.',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class LoginByPrivatekeyRequestDto extends LoginByPasskeyRequestDto {}

// response dto
export class LoginByPasskeyResponseDto {
  @ApiProperty({ description: 'Access token.' })
  accessToken: string;
  @ApiProperty({ description: 'Expiration time of the access token.' })
  expiresIn: number;
}

export class LoginByPrivatekeyResponseDto extends LoginByPasskeyResponseDto {}
