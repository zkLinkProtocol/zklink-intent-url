import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserRepository } from 'src/repositories';
import { CreatorRepository } from 'src/repositories/creator.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, JwtModule, UnitOfWorkModule],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService,
    CreatorRepository,
    UserRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
