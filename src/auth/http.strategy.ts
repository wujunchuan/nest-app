import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-types
  async validate(token: any, done: Function) {
    done(null, { user: 'test' });
  }
}
