import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LRUCache } from 'lru-cache';
import { nanoid } from 'nanoid';

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

const options = {
  max: 10000,
  ttl: 60 * 1000,
  allowStale: false,
  ttlAutopurge: true,
};
const cache = new LRUCache(options);

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
    const message = params.message;
    const key = Buffer.from(message).toString('base64');
    if (!cache.has(key)) {
      return this.error('Invalid message');
    }
    const result = await this.authService.loginByPasskey(
      params.id,
      message,
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
    const message = params.message;
    const key = Buffer.from(message).toString('base64');
    if (!cache.has(key)) {
      return this.error('Invalid message');
    }
    cache.delete(key);
    const result = await this.authService.loginByAddress(
      params.address,
      message,
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
    const nid = nanoid();
    const message = `${sign_message} sign this message to login: ${nid}`;
    const key = Buffer.from(message).toString('base64');
    cache.set(key, true);
    return this.success(message);
  }
}
