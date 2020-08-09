/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:12
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-09 17:50:45
 * @FilePath: /src/users/user.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
