import { User } from '../user/user.entities';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

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
    // unique: true,
  })
  categoryName: string;

  @Column({
    comment: '支出1或者收入2',
    default: 1,
  })
  payType: number;

  @Column({
    comment: '用户id',
    default: 0,
  })
  userId: number;

  // 多对多
  @ManyToMany(() => User, (user) => user.categorys, {
    createForeignKeyConstraints: false,
  })
  user: User[];

  @CreateDateColumn({
    comment: '创建时间',
  })
  ctime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  uTime: Date;
}
