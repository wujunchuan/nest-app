/*
 * Todo: session-strategy
 * @Author: John Trump
 * @Date: 2020-08-13 02:58:10
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-15 01:16:59
 * @FilePath: /src/auth/cookie-serializer.ts
 */
// import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport/dist/passport/passport.serializer';

@Injectable()
export class CookieSerializer extends PassportSerializer {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  serializeUser(user: any, done: Function): any {
    done(null, user);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  deserializeUser(payload: any, done: Function): any {
    done(null, payload);
  }
}
