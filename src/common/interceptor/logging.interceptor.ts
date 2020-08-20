/*
 * 为请求统一打上时间戳
 * @Author: John Trump
 * @Date: 2020-08-21 01:46:00
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-21 01:54:38
 * @FilePath: /src/common/interceptor/logging.interceptor.ts
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const method = request.method;
    const url = request.url;

    const requestTime = Date.now();

    // Add request time to params to be used in exception filters
    request.params.requestTime = requestTime.toString();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} - ${response.statusCode} - ${Date.now() -
              requestTime}ms`,
          ),
        ),
      );
  }
}
