/*
 * 定制基本Entity的形状
 * 包含 `createdAt`, `updatedAt`, `deleteAt` 用于记录时间戳的东西
 * @Author: John Trump
 * @Date: 2020-08-09 23:57:03
 * @LastEditors: John Trump
 * @LastEditTime: 2020-08-10 00:41:37
 * @FilePath: /src/baseEntity.ts
 */
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
// import { Type } from 'class-transformer';

export default class BaseEntity {
  // @Column({
  //   type: 'int',
  //   width: 11,
  //   nullable: false,
  //   readonly: true,
  //   default: () => 0,
  //   transformer: {
  //     to: (value?: Date): number | Date =>
  //       !value ? value : Math.round(value.getTime() / 1000),
  //     from: (value?: number): number | Date =>
  //       !value ? value : new Date(value * 1000),
  //   },
  // })
  // @Type(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  // @Column({ type: 'date', nullable: true })
  createdAt: Date;

  // @Column({
  //   type: 'int',
  //   width: 11,
  //   nullable: true,
  //   default: () => null,
  //   transformer: {
  //     to: (value?: Date): number | Date =>
  //       !value ? value : Math.round(value.getTime() / 1000),
  //     from: (value?: number): number | Date =>
  //       !value ? value : new Date(value * 1000),
  //   },
  // })
  // @Type(() => Date)
  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => null })
  // @Column({ type: 'date', nullable: true })
  updatedAt?: Date;

  // @Column({
  //   type: 'int',
  //   width: 11,
  //   nullable: true,
  //   default: () => null,
  //   transformer: {
  //     to: (value?: Date): number | Date =>
  //       !value ? value : Math.round(value.getTime() / 1000),
  //     from: (value?: number): number | Date =>
  //       !value ? value : new Date(value * 1000),
  //   },
  // })
  // @Type(() => Date)
  @CreateDateColumn({ type: 'timestamp', nullable: true, default: () => null })
  // @Column({ type: 'date', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  updateDateCreation(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }
}
