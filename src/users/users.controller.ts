/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:52:28
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-13 01:57:08
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
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserDto } from './models/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  // @ApiOperation({ summary: 'Authenticate' })
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(@Request() req): Promise<any> {
    return req.user;
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get List of All Users' })
  @ApiResponse({ status: 200, description: 'User Found.' })
  @ApiResponse({ status: 404, description: 'No Users found.' })
  // we do not need to handle any errors as they are handled by the global exception handler.
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateOne(id, createUserDto);
  }
}
