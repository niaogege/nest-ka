import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { User } from './user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
  ) {}
  async create(user: CreateUserDto) {
    console.log(user, 'createUserDto');
    const { username } = user;
    const existUser = await this.findByUsername(username);
    console.log(existUser, 'existUser');
    if (existUser && (existUser.id || existUser.username)) {
      throw new CustomException(ErrorCode.ERR_10001);
    }
    const newUser = this.userRep.create(user);
    newUser.password = hashSync(newUser.password, 10);
    return await this.userRep.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'avatar', 'signature'],
    });
  }
}
