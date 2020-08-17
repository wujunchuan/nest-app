import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
    WinstonModule.forRoot({}),
    UsersModule,
    ProjectsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
