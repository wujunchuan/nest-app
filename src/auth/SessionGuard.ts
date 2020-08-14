/*
 * TODO: session-strategy
 * @Author: John Trump
 * @Date: 2020-08-13 02:58:10
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-15 01:16:33
 * @FilePath: /src/auth/SessionGuard.ts
 */
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AppError } from '../common/error/AppError';
import { AppErrorTypeEnum } from '../common/error/AppErrorTypeEnum';

export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    try {
      if (request.session.passport.user) return true;
    } catch (e) {
      throw new AppError(AppErrorTypeEnum.NOT_IN_SESSION);
    }
  }
}
