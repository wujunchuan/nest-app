import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:40
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-09 17:43:01
 * @FilePath: /src/users/dto/create-user.dto.ts
 */
export class CreateUserDto {
  @ApiProperty({
    default:
      'The plugin will automatically generate any missing swagger properties, but if you need to override them, you simply set them explicitly via @ApiProperty().',
  })
  /** The user's first name  */
  firstName: string;
  /** The user's last name  */
  lastName: string;
}
