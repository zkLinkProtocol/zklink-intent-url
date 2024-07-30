import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import config from 'src/config';
import { CreatorRepository } from 'src/repositories/creator.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    PassportModule,
    JwtModule,
    UnitOfWorkModule,
  ],
  providers: [AuthService, JwtStrategy, JwtService, CreatorRepository],
  controllers: [AuthController],
})
export class AuthModule {}
