import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configFactory from './config';
import { Action } from './entities/action.entity';
import { Creator } from './entities/creator.entity';
import { Intention } from './entities/intention.entity';
import { IntentionRecord } from './entities/intentionRecord.entity';
import { IntentionRecordTx } from './entities/intentionRecordTx.entity';
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
      Intention,
      IntentionRecord,
      IntentionRecordTx,
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
