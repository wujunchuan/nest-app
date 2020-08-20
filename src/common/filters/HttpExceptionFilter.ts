/*
 * 全局过滤器 - 处理错误信息
 * @Author: John Trump
 * @Date: 2020-08-12 23:56:16
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-21 01:52:38
 * @FilePath: /src/common/filters/HttpExceptionFilter.ts
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
  LoggerService,
  HttpException,
} from '@nestjs/common';

import { AppError } from '../error/AppError';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    // Get the location where the error was thrown from to use as a logging tag
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const method = req.method;
    const url = req.url;
    const requestTime = Number(req.params.requestTime) || 0;
    const stackTop = exception.stack
      .split('\n')[1]
      .split('at ')[1]
      .split(' ')[0];
    this.logger.log(
      `${method} ${url} - ${status} - ${Date.now() - requestTime}ms`,
      'Access',
    );
    this.logger.error(`${exception}`, stackTop, HttpExceptionFilter.name);
    this.logger.error(
      `${req.originalUrl}`,
      req.rawHeaders.toString(),
      HttpExceptionFilter.name,
    );
    this.logger.error(
      `request payload:`,
      JSON.stringify(req.body),
      HttpExceptionFilter.name,
    );
    /* 自定义异常处理 */
    if (exception instanceof AppError) {
      return res.status(exception.httpStatus).json({
        code: exception.errorCode,
        data: [],
        message: exception.errorMessage,
      });
    } else if (exception instanceof UnauthorizedException) {
      /* 未授权异常 */
      return res.status(HttpStatus.UNAUTHORIZED).json(exception.message);
    } else if (exception.status === 403) {
      /* 权限验证异常 */
      return res.status(HttpStatus.FORBIDDEN).json(exception.message);
    } else {
      /* 其他异常, 如 `class-validator` 抛出的 */
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(exception);
    }
  }
}
