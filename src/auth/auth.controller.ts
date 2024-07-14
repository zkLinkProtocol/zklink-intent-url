import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginByPasskeyRequestDto,
  LoginByPasskeyResponseDto,
  LoginByPrivatekeyRequestDto,
  LoginByPrivatekeyResponseDto,
} from './auth.dto';
import { BaseController } from 'src/common/base.controller';
import { ResponseDto } from 'src/common/response.dto';
import { CommonApiOperation } from 'src/common/base.decorators';
import { JwtAuthGuard } from './jwtAuth.guard';
import { GetCreator } from './creator.decorators';

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
    const restult = await this.authService.login(
      params.publickey,
      params.message,
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
      params.publickey,
      params.message,
      params.signature,
      'privatekey',
    );
    return this.success({
      accessToken: restult.accessToken,
      expiresIn: restult.expiresIn,
    });
  }

  @Get('creator')
  @UseGuards(JwtAuthGuard)
  async getUser(@GetCreator() creator) {
    return creator;
  }
}
