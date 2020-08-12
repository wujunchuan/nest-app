import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './models/create-user.dto';
import { UserEntity } from './user.entity';
import { ProjectEntity } from '@/projects/projects.entity';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity>;
  remove(id: string): Promise<void>;
  updateOne(id: string, createUserDto: CreateUserDto): Promise<UserEntity>;
  getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]>;
}

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProjectsForUser(user: UserEntity): Promise<ProjectEntity[]> {
    throw new Error('Method not implemented.');
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateOne(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const user = new UserEntity();
    Object.assign(user, createUserDto);
    const { affected } = await this.usersRepository.update(id, user);
    if (affected > 0) return this.usersRepository.findOne(id);
  }
}
