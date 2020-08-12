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
