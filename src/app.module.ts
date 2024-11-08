import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-ioredis-yet';
import { nanoid } from 'nanoid';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configFactory, { ConfigType } from './config';
import { Action } from './entities/action.entity';
import { Commission } from './entities/commission.entity';
import { Creator } from './entities/creator.entity';
import { Intention } from './entities/intention.entity';
import { IntentionRecord } from './entities/intentionRecord.entity';
import { IntentionRecordTx } from './entities/intentionRecordTx.entity';
import { TgGroupAndChannel } from './entities/tgGroupAndChannel.entity';
import { TgMessage } from './entities/tgMessage.entity';
import { MetricsModule } from './metrics';
import { ActionModule } from './modules/action/action.module';
import { ActionsJsonModule } from './modules/actions.json/actionsJson.module';
import { ActionUrlModule } from './modules/actionUrl/actionUrl.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { HubModule } from './modules/hub/hub.module';
import { TgbotModule } from './modules/tgbot/tgbot.module';
import { typeOrmModuleOptions } from './typeorm.config';
import { UnitOfWorkModule } from './unitOfWork';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis', {
          infer: true,
        }) as ConfigType['redis'];

        const store = await redisStore({
          host: redisConfig.host,
          port: redisConfig.port,
          db: redisConfig.db,
          ttl: 5 * 60 * 1000, // default 5 minutes
          keyPrefix: 'magicLink:',
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
    }),
    ClsModule.forRoot({
      global: true,
      interceptor: {
        mount: true,
        generateId: true,
        idGenerator: () => nanoid(),
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configFactory],
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
    TypeOrmModule.forFeature([
      Action,
      Creator,
      Commission,
      Intention,
      IntentionRecord,
      IntentionRecordTx,
      TgMessage,
      TgGroupAndChannel,
    ]),
    ActionModule.forRoot(),
    MetricsModule,
    UnitOfWorkModule,
    AuthModule,
    ActionUrlModule,
    FilesModule,
    HubModule,
    ActionsJsonModule,
    TgbotModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
