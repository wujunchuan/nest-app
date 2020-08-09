import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* init Swagger support */
  const options = new DocumentBuilder()
    .setTitle('Nest.js app')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 验证器错误处理
  app.useGlobalPipes(
    new ValidationPipe(),
    // {
    // 是否开启详细错误提醒
    // disableErrorMessages: process.env.NODE_ENV !== 'production',
    // forbidUnknownValues: true,
    // 没法直接定义返回结构，就把返回抛出异常
    // exceptionFactory: error => new MyException(400, 40001, null, error),
    // }
  );

  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
