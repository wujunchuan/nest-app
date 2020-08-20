import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user) return null;

    /* 对密码进行散列操作, 并且与数据库的散列值进行对比 */
    // extract: cryptoUtil.encryptPassword
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    if (user.password_hash === passHash) {
      delete user.password_hash;
      return user;
    }
  }

  login(user: any) {
    console.log(user);
    const payload = { username: user.userName, sub: user.id };
    return {
      /* @nest-jwt 提供的, 用于从用户对象属性的子集生成 jwt，然后以简单对象的形式返回一个 access_token 属性 */
      access_token: this.jwtService.sign(payload),
    };
  }
}
