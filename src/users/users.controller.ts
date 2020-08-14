/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:52:28
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-15 01:26:09
 * @FilePath: /src/users/users.controller.ts
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto } from './models/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: 'User Found.' })
  @ApiResponse({ status: 404, description: 'No Users found.' })
  // we do not need to handle any errors as they are handled by the global exception handler.
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查找用户' })
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息' })
  updateOne(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateOne(id, createUserDto);
  }
}
