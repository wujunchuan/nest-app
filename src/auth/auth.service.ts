import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // curl -X POST http://localhost:3000/user/login -d '{"username": "john", "password": "john"}' -H "Content-Type: application/json"
  async validateUser(username: string, password: string): Promise<any> {
    if (username === password) {
      return { username, password };
    }
    return null;
  }
}
