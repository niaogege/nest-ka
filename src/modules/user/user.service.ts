import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { CreateUserDto } from './user.dto';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { User } from './user.entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRep: Repository<User>) {}

  // 注册用户
  async create(user: CreateUserDto) {
    const { username } = user;
    const existUser = await this.findByUsername(username);
    if (existUser && (existUser.id || existUser.username)) {
      throw new CustomException(ErrorCode.ERR_10001);
    }
    const newUser = this.userRep.create(user);
    newUser.password = hashSync(newUser.password, 10);
    return await this.userRep.save(newUser);
  }
  // 根据用户名查找
  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
    });
  }

  // 根据用户id进行查找
  async findOne(id: number) {
    return this.userRep.findOneBy({
      id,
    });
  }

  // 重设密码
  async resetPassword(id: number, password: string) {
    const user = await this.userRep.findOne({ where: { id } });
    user.password = hashSync(password);
    return await this.userRep.save(user);
  }

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
}
