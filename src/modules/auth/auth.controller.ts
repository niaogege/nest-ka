import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  // 微信端暂且不需要本地校验密码 remove authGuard
  @Public()
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  /**
   * @param code wx.login() 临时登录的凭证 换取用户的openId/session_key
   * @returns
   */
  @Public()
  @Post('mp')
  async minprogramAuth(@Body() param: { code: string }) {
    return this.authService.loginMp(param.code);
  }
}
