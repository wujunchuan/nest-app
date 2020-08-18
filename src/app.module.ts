import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    /* ORM, TypeORM */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'meetone123',
      database: 'nest_zero_to_one',
      /* with that options, every model registered through the `forFeature()` method will be automatically added to the `models` arrays of the configuration object */
      autoLoadEntities: true,
      synchronize: true,
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
