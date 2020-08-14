/*
 * jwt 认证策略
 * @Author: John Trump
 * @Date: 2020-08-15 01:16:00
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-15 01:36:44
 * @FilePath: /src/auth/jwt.strategy.ts
 */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 提供从请求中提取 JWT 的方法
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 过期token将被拒绝
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * token -> JSON
   * 根据 JWT 签名的工作方式，我们可以保证接收到之前已签名并发给有效用户的有效 token 令牌。
   * @param payload token
   */
  async validate(payload: any) {
    // 我们可以在此方法中执行数据库查询, 以提取关于用户的更多信息. 从而在请求中提供更丰富的用户对象
    // 例如在已撤销的令牌列表中查找 userId ，使我们能够执行令牌撤销。
    return { id: payload.sub, username: payload.username };
  }
}
