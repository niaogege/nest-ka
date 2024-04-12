## 理一理数据库表设计和关系

- 实现账本功能
- 实现账单记录，一个账本阔以有多个账单
- 实现账本共享功能，也就是，比如家庭账本，老婆和老公共享一个账本，然后记录家庭开支
- 实现类目功能，个人阔以自主添加自定义类目

## 用户表

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn() //默认主键 自增
  id: number;

  @Column({ length: 20, unique: true })
  username: string;

  // 一个用户拥有多个账本
  @OneToMany(() => Account, (account) => account.owner)
  ownedAccounts: Account[];

  // 一个用户阔以共享多个账本
  @ManyToMany(() => Account, (account) => account.sharedUsers)
  shareAccounts: Account[]; // 共享的账目清单

  // @OneToMany(() => Bill, (bill) => bill.user)
  // bills: Bill[];
}
```

## 账本表

```ts
@Entity()
export class Account {
  @PrimaryGeneratedColumn() //默认主键 自增
  id: number;

  // 一个账本只能有一个用户创建
  @ManyToOne(() => User, (user) => user.ownedAccounts)
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
}
```

## 账单表

```ts
@Entity()
export class Bill {
  // 一个账单只能属于一个共享账目
  @ManyToOne(() => Account, (account) => account.bills)
  shareAccount: Account;

  // 一条账单只能属于一个类目
  @ManyToOne(() => Category, (category) => category.bills)
  category: Category;

  // 只能有一个用户创建
  // @ManyToOne(() => User, (user) => user.entries)
  // user: User
}
```

## 类目表

```ts
@Entity({
  comment: 'cate 账目类型',
  name: 'category',
})
export class Category {
  // 类目只能在账目里新建 账目的拥有者才能建类目
  @ManyToOne(() => Account, (account) => account.categorys)
  shareAccount: Account;

  // 一条类目阔以有多条账单
  @OneToMany(() => Bill, (bill) => bill.category)
  bills: Bill[];
}
```
