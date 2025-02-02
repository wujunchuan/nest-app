import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

// import * as passport from 'passport';
// import * as session from 'express-session';

import { HttpExceptionFilter } from './common/filters/HttpExceptionFilter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AppModule } from './app.module';
import loggerOptions from './common/logger';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

/** 服务启动的端口 */
const port = process.env.PORT || 3000;
/** Winston Logger */
const logger = WinstonModule.createLogger(loggerOptions);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // https://github.com/gremo/nest-winston#use-as-the-main-nest-logger-also-for-bootstrapping
    logger,
  });
  /* 设置 `Winston.logger` 日志为Nest的日志, 这样才能打印出系统初始化时的日志 */
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  /* Swagger */
  const options = new DocumentBuilder()
    .setTitle('Nest.js app')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', bearerFormat: 'JWT', scheme: 'bearer' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  /* 设置接口请求频率 */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 1000, // 限制15分钟内最多只能访问1000次
    }),
  );
  /* 网络安全 - Web漏洞 */
  app.use(helmet());
  /* 统一验证DTO */
  app.useGlobalPipes(
    new ValidationPipe({
      // MARK: 搞明白这些参数是干嘛的
      transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      // skipMissingProperties: false,
      // forbidUnknownValues: true,
    }),
  );
  /* 统一请求成功的返回数据 */
  app.useGlobalInterceptors(new TransformInterceptor());
  /** 统一打上时间戳, 统计接口耗时 */
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  /* 拦截全部的错误请求,统一返回格式 */
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  /* 设置Auth */
  // app.use(
  //   session({
  //     secret: 'secret-key',
  //     name: 'sess-tutorial',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  logger.log(`process.env.NODE_ENV:${process.env.NODE_ENV}`, bootstrap.name);
  await app.listen(port);
  logger.log(`http://localhost:${port} 服务启动成功`, bootstrap.name);
}
bootstrap();
