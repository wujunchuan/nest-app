/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:40
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-13 00:09:34
 * @FilePath: /src/users/models/create-user.dto.ts
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly userName: string;
  @ApiProperty()
  readonly password: string;
}
