/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:40
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-09 17:50:43
 * @FilePath: /src/users/dto/create-user.dto.ts
 */

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: `The user's first name`,
    default:
      'The plugin will automatically generate any missing swagger properties, but if you need to override them, you simply set them explicitly via @ApiProperty().',
  })
  /** The user's first name  */
  firstName: string;
  @ApiProperty({
    description: `The user's last name`,
  })
  /** The user's last name  */
  lastName: string;
}
