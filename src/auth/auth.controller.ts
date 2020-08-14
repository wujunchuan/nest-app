import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '@/users/user.entity';
import { LocalAuthDto } from './models/local-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Basic Authenticate for local strategy' })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _authDto: LocalAuthDto,
  ): Promise<any> {
    return this.authService.login(req.user);
  }
}
