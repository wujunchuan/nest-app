import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user) return null;
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    if (user.password_hash === passHash) {
      delete user.password_hash;
      return user;
    }
  }
}
