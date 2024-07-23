import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BaseController } from 'src/common/base.controller';
import { CommonApiOperation } from 'src/common/base.decorators';
import { ResponseDto } from 'src/common/response.dto';
import { sign_message } from 'src/constants';

import {
  LoginByPasskeyRequestDto,
  LoginByPasskeyResponseDto,
  LoginByPrivatekeyRequestDto,
  LoginByPrivatekeyResponseDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login/passkey')
  @CommonApiOperation('Login dashbord by passkey.')
  async loginByPasskey(
    @Body() params: LoginByPasskeyRequestDto,
  ): Promise<ResponseDto<LoginByPasskeyResponseDto>> {
    const result = await this.authService.loginByPasskey(
      params.id,
      params.signature,
    );
    return this.success({
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
    });
  }

  @Post('login/privatekey')
  @CommonApiOperation('Login dashbord by eoa address.')
  async loginByPrivatekey(
    @Body() params: LoginByPrivatekeyRequestDto,
  ): Promise<ResponseDto<LoginByPrivatekeyResponseDto>> {
    const result = await this.authService.loginByAddress(
      params.address,
      params.signature,
    );
    return this.success({
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
    });
  }

  @Get('message')
  @CommonApiOperation('Returns the sign message .')
  async getSignMessage(): Promise<ResponseDto<string>> {
    return this.success(sign_message);
  }
}
