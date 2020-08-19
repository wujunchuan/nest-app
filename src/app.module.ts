import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config';

@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      load: appConfig,
      isGlobal: true,
    }),
    /* ORM, TypeORM */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: config.get<'mysql'>('database.type'),
          host: config.get<string>('database.host'),
          port: config.get<number>('database.port'),
          username: config.get<string>('database.username'),
          password: config.get<string>('database.password'),
          database: config.get<string>('database.database'),
          charset: config.get<string>('database.charset'),
          multipleStatements: config.get<boolean>(
            'database.multipleStatements',
          ),
          connectionLimit: 10, // 连接限制
          /* with that options, every model registered through the `forFeature()` method will be automatically added to the `models` arrays of the configuration object */
          autoLoadEntities: true,
          synchronize: config.get<boolean>('database.synchronize'),
        };
      },
    }),
    /* 日志, Winston */
    WinstonModule.forRoot({
      level: 'info',
      // format: winston.format.json(),
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
      defaultMeta: { service: 'nest-service' },
      transports: [
        new winston.transports.Console(),
        // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // - Write all logs with level `info` and below to `combined.log`
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
    UsersModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
