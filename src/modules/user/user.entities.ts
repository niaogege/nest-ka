import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Bill } from '../bill/bill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() //默认主键 自增
  id: number;

  @Column({ length: 20 })
  username: string;

  // 从数据库获取用户信息时 不读取password，可以设置长度30个字节
  @Exclude()
  @Column({
    select: false,
    length: 100,
  })
  password: string;

  @Column({
    default: 'This is My KeepAccount 1',
  })
  signature: string;

  @Column({
    default: 'https://bythewayer.com/logo.png',
  })
  avatar: string;

  @CreateDateColumn()
  ctime: Date;

  // 一个用户关联多个账单
  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];
}
