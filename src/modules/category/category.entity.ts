import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bill } from '../bill/bill.entity';
import { Account } from '../account/account.entity';
@Entity({
  comment: 'cate 账目类型',
  name: 'category',
})
export class Category {
  @PrimaryGeneratedColumn({
    name: 'categoryId',
  })
  id: number;

  @Column({
    comment: 'name 类型名称',
  })
  categoryName: string;

  @Column({
    comment: '支出1或者收入2or3',
    default: 1,
  })
  payType: number;

  @Column({
    comment: '用户id,传0代表默认类目',
    default: 0,
  })
  userId: number;

  // 类目只能在账目里新建 账目的拥有者才能建类目
  @ManyToOne(() => Account, (account) => account.categorys)
  shareAccount: Account;

  // 一条类目阔以有多条账单
  @OneToMany(() => Bill, (bill) => bill.category)
  bills: Bill[];

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  uTime: Date;
}
