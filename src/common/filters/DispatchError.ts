/*
 * 全局过滤器 - 处理错误信息
 * @Author: John Trump
 * @Date: 2020-08-12 23:56:16
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-13 00:01:34
 * @FilePath: /src/common/filters/DispatchError.ts
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

import { AppError } from '../error/AppError';

@Catch()
export class DispatchError implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    if (exception instanceof AppError) {
      return res.status(exception.httpStatus).json({
        errorCode: exception.errorCode,
        errorMsg: exception.errorMessage,
        usrMsg: exception.userMessage,
        httpCode: exception.httpStatus,
      });
    } else if (exception instanceof UnauthorizedException) {
      console.log(exception.message);
      console.error(exception.stack);
      return res.status(HttpStatus.UNAUTHORIZED).json(exception.message);
    } else if (exception.status === 403) {
      return res.status(HttpStatus.FORBIDDEN).json(exception.message);
    } else {
      console.error(exception.message);
      console.error(exception.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
