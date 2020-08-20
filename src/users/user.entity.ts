/*
 * @Author: John Trump
 * @Date: 2020-08-09 16:54:12
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-20 02:10:07
 * @FilePath: /src/users/user.entity.ts
 */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import BaseEntity from '@/baseEntity';
import { ProjectEntity } from '@/projects/projects.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 30,
  })
  public firstName: string;

  @Column({
    length: 30,
  })
  public lastName: string;

  @Column({
    length: 50,
  })
  public userName: string;

  @Column({
    length: 250,
    // do not return this column when using find methods or running a query to select a user.
    select: false,
    // set the actual column name
    name: 'password',
  })
  public password_hash: string;

  /**
   * TypeScript setter to automatically hash the password when the password property is set.
   */
  set password(password: string) {
    // extract: cryptoUtil.encryptPassword
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    this.password_hash = passHash;
  }
  // TODO: one to many withProjectEntity
  @OneToMany(
    () => ProjectEntity,
    project => project.user,
  )
  projects: ProjectEntity[];
}
