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
    comment: '消费类型',
    nullable: true,
  })
  typeName: string;

  @Column({
    comment: '消费类型id',
    nullable: true,
  })
  typeId: number;

  @Column({
    comment: '备注信息',
  })
  remark: string;

  // 多对一 多个账单对应一个用户
  @ManyToOne(() => User, (user) => user.bills)
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
