import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import { Account } from './account.entity';
import { User } from '../user/user.entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRep: Repository<Account>,
    @InjectRepository(User) private userRep: Repository<User>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const account = this.accountRep.create(createAccountDto);
    if (createAccountDto.sharedUserIds) {
      const ids = createAccountDto.sharedUserIds.split(',').map((e) => +e);
      const users = await this.userRep.find({
        where: {
          id: In(ids),
        },
      });
      account.sharedUsers = users;
    }
    if (createAccountDto.userId) {
      const user = await this.userRep.findOne({
        where: {
          id: createAccountDto.userId,
        },
      });
      account.owner = user;
    }
    return await this.accountRep.save(account);
  }
  // 最新的排在前面
  async findAll(userId: number) {
    return this.accountRep.find({
      order: { upTime: 'DESC' },
      where: { userId },
    });
  }

  async findOne(id: number) {
    return await this.accountRep.findOne({
      where: [
        {
          id,
        },
      ],
      relations: {
        sharedUsers: true,
        owner: true,
      },
    });
  }

  // 查询所有账本
  async findAllList(query) {
    const { page, size } = query;
    const [accounts, total] = await this.accountRep.findAndCount({
      skip: (page - 1) * size, // offset
      take: size, // limit
    });
    return { accounts, total };
  }

  // 更新账目 无非是更新名称和分享者
  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const curAccount = await this.findOne(id);
    if (!curAccount) {
      throw new BadRequestException('账本不存在或者已删除');
    }
    if (updateAccountDto.userId != curAccount.userId) {
      throw new BadRequestException('只有当前创建者才有权限更改');
    }
    if (updateAccountDto.sharedUserIds) {
      const ids = updateAccountDto.sharedUserIds
        .split(',')
        .map((e) => +e)
        .filter((e) => e != curAccount.userId);
      const users = await this.userRep.find({
        where: {
          id: In(ids),
        },
      });
      curAccount.sharedUsers = users;
    }
    const newAccount = this.accountRep.merge(curAccount, updateAccountDto);
    if (!newAccount.owner) {
      const user = await this.userRep.findOne({
        where: {
          id: updateAccountDto.userId,
        },
      });
      newAccount.owner = user;
    }
    return await this.accountRep.save(newAccount);
  }

  async remove(id: number) {
    return await this.accountRep.delete(id);
  }
}
