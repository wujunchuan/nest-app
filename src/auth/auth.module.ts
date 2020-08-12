import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
// import { AppAuthGuard } from './AppAuthGuard';
// import { CookieSerializer } from './cookie-serializer';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
