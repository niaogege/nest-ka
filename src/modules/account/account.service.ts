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
    const existAccount = await this.accountRep.findOne({
      where: [{ accountName: createAccountDto.accountName }],
    });
    if (existAccount) {
      throw new BadRequestException('账目已经存在');
    }
    const account = this.accountRep.create(createAccountDto);
    if (createAccountDto.sharedUserIds) {
      const users = await this.userRep.find({
        where: {
          id: In(createAccountDto.sharedUserIds),
        },
      });
      account.sharedUsers = users;
    }
    return await this.accountRep.save(account);
  }
  // 最新的排在前面
  async findAll(id: number) {
    return this.accountRep.find({
      order: { upTime: 'DESC' },
      where: { userId: id },
    });
  }

  async findOne(id: number) {
    return await this.accountRep.findOne({
      where: [
        {
          id,
        },
      ],
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const curAccount = await this.findOne(id);
    if (!curAccount) {
      throw new BadRequestException('账本不存在或者已删除');
    }
    const newBill = this.accountRep.merge(curAccount, updateAccountDto);
    return await this.accountRep.save(newBill);
  }

  async remove(id: number) {
    console.log(id, 'iddd');
    await this.accountRep.delete(id);
    return true;
  }
}
