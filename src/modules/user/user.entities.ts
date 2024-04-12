import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Account } from '../account/account.entity';
import { Bill } from '../bill/bill.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn() //默认主键 自增
  id: number;

  @Column({ length: 20, unique: true })
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

  // 一个用户拥有多个账本
  @OneToMany(() => Account, (account) => account.owner)
  ownedAccounts: Account[];

  // 一个用户阔以共享多个账本
  @ManyToMany(() => Account, (account) => account.sharedUsers)
  shareAccounts: Account[]; // 共享的账目清单

  // @OneToMany(() => Bill, (bill) => bill.user)
  // bills: Bill[];

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  upTime: Date;
}
