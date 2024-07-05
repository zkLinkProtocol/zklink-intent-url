import { Controller, Get, Post, Body, Headers, Query, HttpException, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('v1')
export class LoginController {
  constructor(
    private loginService: LoginService, 
  ) {}
}
