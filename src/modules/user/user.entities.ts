import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Bill } from '../bill/bill.entity';
import { Category } from '../category/category.entity';

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

  // 一个用户关联多个账单
  @OneToMany(() => Bill, (bill) => bill.user)
  bills: Bill[];

  // 多对多 用户阔以自定义设置类型 一个类型阔以共享用户
  @ManyToMany(() => Category, (category) => category.user, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinTable()
  categorys: Category[];

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  uptimeTime: Date;
}
