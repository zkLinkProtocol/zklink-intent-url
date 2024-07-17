import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActionModule } from './action/action.module';
import { ActionUrlModule } from './actionUrl/actionUrl.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { ActionUrl } from './entities/actionUrl.entity';
import { Creator } from './entities/creator.entity';
import { MetricsModule } from './metrics';
import { typeOrmModuleOptions } from './typeorm.config';
import { UnitOfWorkModule } from './unitOfWork';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          ...typeOrmModuleOptions,
          autoLoadEntities: true,
          retryDelay: 3000, // to cover 3 minute DB failover window
          retryAttempts: 70, // try to reconnect for 3.5 minutes,
        };
      },
    }),
    TypeOrmModule.forFeature([Creator, ActionUrl]),
    MetricsModule,
    UnitOfWorkModule,
    AuthModule,
    ActionUrlModule,
    ActionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
