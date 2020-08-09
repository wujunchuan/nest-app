/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:12
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-10 00:24:50
 * @FilePath: /src/users/user.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '@/baseEntity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @Column({ default: true })
  // isActive: boolean;
}
