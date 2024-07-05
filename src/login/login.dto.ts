import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNumberString()
  token: string;

  @IsNotEmpty()
  @IsNumberString()
  expireTime: string;
}
