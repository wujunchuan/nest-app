import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}
  getHello(): any {
    return {
      jwt: {
        secretKey: this.config.get<string>('JWTConfig.secretKey'),
      },
      database: {
        type: this.config.get<'mysql'>('database.type'),
        host: this.config.get<string>('database.host'),
        port: this.config.get<number>('database.port'),
        username: this.config.get<string>('database.username'),
        password: this.config.get<string>('database.password'),
        database: this.config.get<string>('database.database'),
        charset: this.config.get<string>('database.charset'),
        multipleStatements: this.config.get<boolean>(
          'database.multipleStatements',
        ),
        connectionLimit: 10, // 连接限制
        /* with that options, every model registered through the `forFeature()` method will be automatically added to the `models` arrays of the configuration object */
        autoLoadEntities: true,
        synchronize: this.config.get<boolean>('database.synchronize'),
      },
    };
  }
}
