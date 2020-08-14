import { ApiProperty } from '@nestjs/swagger';

export class LocalAuthDto {
  @ApiProperty({
    description: '账号名',
    example: 'wujunchuan',
  })
  readonly username: string;
  @ApiProperty({
    description: '密码',
    example: 'wujunchuan1994',
  })
  readonly password: string;
}
