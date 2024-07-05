import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// request dto
export class LoginByPasskeyRequestDto {
  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class LoginByPrivatekeyRequestDto extends LoginByPasskeyRequestDto {}

// response dto
export class LoginByPasskeyResponseDto {
  @ApiProperty({ description: 'Token name' })
  token: string;
}

export class LoginByPrivatekeyResponseDto {
  @ApiProperty({ description: 'Token name' })
  token: string;
}
