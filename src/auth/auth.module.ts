import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import config from '../config';
import { CreatorRepository } from 'src/repositories/creator.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

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
