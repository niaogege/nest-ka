import { User } from '../user/user.entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Account } from '../account/account.entity';
import { Category } from '../category/category.entity';
@Entity({
  name: 'bill-test',
  comment: 'bill for test',
})
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '账单',
    nullable: true,
  })
  amount: number;

  @Column({
    comment: '消费类别类型',
    nullable: true,
  })
  categoryName: string;

  @Column({
    comment: '消费类别类型id',
    nullable: true,
  })
  categoryId: number;

  @Column({
    comment: '支出1或者收入2或者不计收支3',
    default: 1,
  })
  payType: number;

  @Column({
    comment: '备注信息',
  })
  remark: string;

  // 一个账单只能属于一个共享账目
  @ManyToOne(() => Account, (account) => account.bills)
  shareAccount: Account;

  // 一条账单只能属于一个类目
  @ManyToOne(() => Category, (category) => category.bills)
  category: Category;

  // // 只能有一个用户创建
  // @ManyToOne(() => User, (user) => user.bills)
  // user: User;

  @Column({
    comment: '用户id',
  })
  userId: number;

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  uptimeTime: Date;
}
