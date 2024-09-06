import { DynamicModule, Global, Module, OnModuleInit } from '@nestjs/common';
import {
  APP_INTERCEPTOR,
  DiscoveryModule,
  DiscoveryService,
  Reflector,
} from '@nestjs/core';

import { ACTION_PLUG, RegistryModule } from '@action/registry';
import { ActionRepository } from 'src/repositories/action.repository';
import { UnitOfWorkModule } from 'src/unitOfWork';

import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { BigIntInterceptor } from './interceptor';
import { RegistryAction } from './model';

@Global()
@Module({ imports: [DiscoveryModule, UnitOfWorkModule, RegistryModule] })
export class ActionModule implements OnModuleInit {
  private serviceRegistry = new Array<RegistryAction>();

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.scanAndRegisterServices();
  }
  static forRoot(): DynamicModule {
    return {
      module: ActionModule,
      controllers: [ActionController],
      providers: [
        ActionRepository,
        {
          provide: 'ALL_ACTION_PLUGS',
          useFactory: (module: ActionModule) => {
            return module.serviceRegistry;
          },
          inject: [ActionModule],
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: BigIntInterceptor,
        },
        ActionService,
      ],
      exports: ['ALL_ACTION_PLUGS', ActionService],
    };
  }

  private scanAndRegisterServices() {
    const wrappers = this.discoveryService.getProviders();

    wrappers.forEach((wrapper) => {
      const { metatype } = wrapper;
      if (metatype && this.reflector.get(ACTION_PLUG, metatype)) {
        const { id, version } = this.reflector.get(ACTION_PLUG, metatype);
        this.serviceRegistry.push({ id, version, service: wrapper.instance });
      }
    });
  }
}
