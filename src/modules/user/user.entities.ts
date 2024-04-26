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

  @Column({ length: 20, default: '默认微信昵称' })
  username: string;

  // 从数据库获取用户信息时 不读取password，可以设置长度30个字节
  // 微信基础登录 不需要password
  // @Exclude()
  // @Column({
  //   select: false,
  //   length: 100,
  // })
  // password: string;

  // 微信端 登录 不需要手机号和密码
  // 直接通过openid标识是否注册
  @Column({ default: '', comment: '微信小程序端唯一标识' })
  openid: string;

  @Column({
    default: 'This is My KeepAccount 1',
  })
  signature: string;

  @Column({
    default:
      'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
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
