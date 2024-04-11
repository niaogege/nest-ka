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
    comment: '支出1或者收入2',
    default: 1,
  })
  payType: number;

  @Column({
    comment: '备注信息',
  })
  remark: string;

  // 多对一 多个账单对应一个用户
  @ManyToOne(() => User, (user) => user.bills, {
    createForeignKeyConstraints: false,
    cascade: true, // 级连只能写在ManyToOne这侧
  })
  @JoinColumn()
  user: User;

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
