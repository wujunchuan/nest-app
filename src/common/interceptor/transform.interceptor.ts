/*
 * 拦截器:
 * 统一请求成功的返回数据
 * @Author: John Trump
 * @Date: 2020-08-17 00:01:11
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-17 00:03:44
 * @FilePath: /src/common/interceptor/transform.interceptor.ts
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}
