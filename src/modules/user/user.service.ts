import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
// import { hashSync } from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { AccountService } from '../account/account.service';
import { User } from './user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRep: Repository<User>,
    private accountService: AccountService,
  ) {}

  // 注册用户
  async create(user: CreateUserDto) {
    const { openid } = user;
    const existUser = await this.findByUseropenid(openid);
    if (existUser && (existUser.id || existUser.openid)) {
      throw new CustomException(ErrorCode.ERR_10001);
    }
    const newUser = this.userRep.create(user);
    // 暂时不需要密码
    // newUser.password = hashSync(newUser.password, 10);
    const res = await this.userRep.save(newUser);
    if (!newUser.ownedAccounts) {
      await this.accountService.create({
        accountName: '默认账本',
        userId: res.id,
        sharedUserIds: '' + res.id,
      });
    }
    return res;
  }
  // 根据用户openid查找
  async findByUseropenid(openid: string) {
    // return (
    //   this.userRep
    //     .createQueryBuilder('user')
    //     // .addSelect('user.password')
    //     .where('user.openid=:openid', { openid })
    //     .getOne()
    // );
    return await this.userRep.findOneBy({ openid });
  }

  // 根据openid查找 openid

  // 根据用户id进行查找 并且关联bill
  async findOne(id: number) {
    console.log(id, 'id');
    return this.userRep.findOne({
      where: { id },
      relations: {
        ownedAccounts: true,
        shareAccounts: true,
      },
    });
  }
  async findMany(ids: number[]) {
    const users = await this.userRep.find({
      where: {
        id: In(ids),
      },
    });
    return users;
  }

  // 重设密码
  // async resetPassword(id: number, password: string) {
  //   const user = await this.userRep.findOne({ where: { id } });
  //   user.password = hashSync(password);
  //   return await this.userRep.save(user);
  // }

  // delete user
  async deleteOne(id: number) {
    return await this.userRep.delete(id);
  }

  async findAll(query: { page: number; size: number }) {
    const { page, size } = query;
    const [users, total] = await this.userRep.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    return { users, total };
  }

  // 更新用户信息
  async update(id: number, updateInfo: UpdateUserDto) {
    const user = await this.userRep.findOneBy({ id });
    const newUser = await this.userRep.merge(user, updateInfo);
    return await this.userRep.save(newUser);
  }
}
