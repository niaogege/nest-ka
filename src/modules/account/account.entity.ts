import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Bill } from '../bill/bill.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entities';

@Entity({
  comment: '账目表',
  name: 'account',
})
export class Account {
  @PrimaryGeneratedColumn() //默认主键 自增
  id: number;

  @Column({
    comment: 'name 类型名称',
    // unique: true,
  })
  accountName: string;

  @Column({
    comment: 'userId 账单拥有者',
  })
  userId: number;

  // 一个账本只能有一个用户创建 只能在one这头进行重命名
  @ManyToOne(() => User, (user) => user.ownedAccounts)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  // 共享账本阔以有多个用户
  @ManyToMany(() => User, (user) => user.shareAccounts, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_accounts',
  })
  sharedUsers: User[]; // 共享账目的用户列表

  // 一个账目有多条账单
  @OneToMany(() => Bill, (bill) => bill.shareAccount)
  bills: Bill;

  // 账目有多个类目
  @OneToMany(() => Category, (category) => category.shareAccount)
  categorys: Category;

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  upTime: Date;
}
