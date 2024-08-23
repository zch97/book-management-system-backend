import { Module, DynamicModule } from '@nestjs/common';
import { DbService } from './db.service';

export interface DbModuleOptions {
  path: string
}

@Module({})
export class DbModule {
  // 封装DbModule为动态模块，用的时候传入不同的参数，动态改变模块的内容
  static register(options: DbModuleOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options
        },
        DbService,
      ],
      exports: [DbService]
    };
  }
}
