/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:40
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-15 02:34:51
 * @FilePath: /src/users/models/create-user.dto.ts
 */

import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: '姓氏',
    example: 'John',
  })
  readonly firstName: string;
  @ApiProperty({
    description: '名字',
    example: 'Trump',
  })
  readonly lastName: string;
  @ApiProperty({
    description: '用户名(登录用)',
    example: 'wujunchuan',
  })
  readonly userName: string;
  @ApiProperty({
    description: '密码',
    example: 'wujunchuan1994',
  })
  @MinLength(5, { message: '密码不得少于5位数' })
  readonly password: string;
}
