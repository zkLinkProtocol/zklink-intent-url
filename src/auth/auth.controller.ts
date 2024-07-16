import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginByPasskeyRequestDto,
  LoginByPasskeyResponseDto,
  LoginByPrivatekeyRequestDto,
  LoginByPrivatekeyResponseDto,
  RegisterByPrivatekeyRequestDto,
} from './auth.dto';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';
import { sign_message } from 'src/constants';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('register')
  @CommonApiOperation('Register creator by eoa address.')
  async registerCreator(
    @Body() params: RegisterByPrivatekeyRequestDto,
  ): Promise<ResponseDto<LoginByPasskeyResponseDto>> {
    const restult = await this.authService.register(
      params.id,
      params.publickey,
      params.passkeySignature,
      params.address,
      params.privatekeySignature,
    );
    return this.success({
      accessToken: restult.accessToken,
      expiresIn: restult.expiresIn,
    });
  }

  @Post('login/passkey')
  @CommonApiOperation('Login dashbord by passkey.')
  async loginByPasskey(
    @Body() params: LoginByPasskeyRequestDto,
  ): Promise<ResponseDto<LoginByPasskeyResponseDto>> {
    const restult = await this.authService.login(
      params.id,
      params.signature,
      'passkey',
    );
    return this.success({
      accessToken: restult.accessToken,
      expiresIn: restult.expiresIn,
    });
  }

  @Post('login/privatekey')
  @CommonApiOperation('Login dashbord by eoa address.')
  async loginByPrivatekey(
    @Body() params: LoginByPrivatekeyRequestDto,
  ): Promise<ResponseDto<LoginByPrivatekeyResponseDto>> {
    const restult = await this.authService.login(
      params.address,
      params.signature,
      'privatekey',
    );
    return this.success({
      accessToken: restult.accessToken,
      expiresIn: restult.expiresIn,
    });
  }

  @Get('message')
  @CommonApiOperation('Returns the sign message .')
  async getSignMessage(): Promise<ResponseDto<string>> {
    return this.success(sign_message);
  }
}
