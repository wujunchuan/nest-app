import { ApiProperty } from '@nestjs/swagger';

export class LocalAuthDto {
  @ApiProperty({
    description: '账号名',
  })
  readonly username: string = 'wujunchuan';
  @ApiProperty({
    description: '密码',
  })
  readonly password: string = 'string';
}
