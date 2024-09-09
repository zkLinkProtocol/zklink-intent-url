import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// request dto
export class RegisterByPrivatekeyRequestDto {
  @ApiProperty({
    name: 'id',
    description: "Passkey's id or public address.",
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    name: 'passkeySignature',
    description: 'Signed id by passkey.',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  passkeySignature: string;

  @ApiProperty({
    name: 'address',
    description: 'Address.',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    name: 'privatekeySignature',
    description: 'Signed string by private key.',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  privatekeySignature: string;
}

export class LoginByPrivatekeyRequestDto {
  @ApiProperty({
    name: 'address',
    description: 'Address.',
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    name: 'tgUserId',
    description: 'telegrame user id.',
    example: '123456789',
  })
  @IsString()
  tgUserId: string;

  @ApiProperty({
    name: 'tgUserName',
    description: 'telegrame user name.',
    example: 'magic_link',
  })
  @IsString()
  tgUserName: string;

  @ApiProperty({
    name: 'message',
    description: 'Message.',
    example: '1234567890abcdef1234567890abcdef12345678',
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

// response dto
export class LoginByPasskeyResponseDto {
  @ApiProperty({ description: 'Access token.' })
  accessToken: string;
  @ApiProperty({ description: 'Expiration time of the access token.' })
  expiresIn: number;
}

export class LoginByPrivatekeyResponseDto extends LoginByPasskeyResponseDto {}

export class SignMessageResponseDto {
  @ApiProperty({
    name: 'message',
    description: 'Sign message.',
    example: 'hello intent',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
