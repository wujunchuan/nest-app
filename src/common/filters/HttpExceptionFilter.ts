/*
 * 全局过滤器 - 处理错误信息
 * @Author: John Trump
 * @Date: 2020-08-12 23:56:16
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-17 00:58:13
 * @FilePath: /src/common/filters/HttpExceptionFilter.ts
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { AppError } from '../error/AppError';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    console.log(req.originalUrl);
    console.log(exception);
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
