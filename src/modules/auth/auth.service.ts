import { Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  create(loginDto: LoginDto) {
    return this.userService.create(loginDto);
  }
  async login(loginDto: LoginDto) {
    console.log('service LoginDto', loginDto);
    // const user = await this.userService.findByUsername(loginDto.password);
    // if (user.password !== loginDto.password) {
    //   throw new CustomException(ErrorCode.ERR_10002);
    // }
    const payload = {
      username: loginDto.username,
      password: loginDto.password,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      type: 'Bearer',
    };
  }
}
