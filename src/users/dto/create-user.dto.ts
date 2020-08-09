/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:40
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-09 18:10:36
 * @FilePath: /src/users/dto/create-user.dto.ts
 */

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: `The user's first name`,
    default:
      'The plugin will automatically generate any missing swagger properties, but if you need to override them, you simply set them explicitly via @ApiProperty().',
  })
  @IsString({ message: '干, 忘记名字了' })
  /** The user's first name  */
  firstName: string;
  @ApiProperty({
    description: `The user's last name`,
  })
  /** The user's last name  */
  @MaxLength(5)
  lastName: string;
}
