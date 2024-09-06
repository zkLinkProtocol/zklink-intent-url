import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { typeOrmModuleOptions } from './typeorm.config';
import { UnitOfWorkModule } from './unitOfWork';

@Module({
  imports: [
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
    MetricsModule,
    UnitOfWorkModule,
    AuthModule,
    ActionUrlModule,
    ActionModule,
    FilesModule,
    HubModule,
    ActionsJsonModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
