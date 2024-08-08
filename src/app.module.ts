import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { ActionUrl } from './entities/actionUrl.entity';
import { Creator } from './entities/creator.entity';
import { MetricsModule } from './metrics';
import { ActionModule } from './modules/action/action.module';
import { ActionUrlModule } from './modules/actionUrl/actionUrl.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { HubModule } from './modules/hub/hub.module';
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
    FilesModule,
    HubModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
