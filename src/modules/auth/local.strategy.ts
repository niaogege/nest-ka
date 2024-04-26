import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import type { IStrategyOptions } from 'passport-local';
// import { compareSync } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'username',
      passwordField: 'openid',
    } as IStrategyOptions);
  }
  // 必须实现一个validate方法
  async validate(username: string, openid: string): Promise<any> {
    const user = await this.userService.findByUseropenid(openid);
    if (!user) {
      throw new CustomException(ErrorCode.ERR_10005);
    }
    // if (!user.password || !compareSync(password, user.password)) {
    //   throw new CustomException(ErrorCode.ERR_10002);
    // }
    if (user.username != username || openid != user.openid) {
      throw new CustomException(ErrorCode.ERR_10002);
    }
    return user;
  }
}
