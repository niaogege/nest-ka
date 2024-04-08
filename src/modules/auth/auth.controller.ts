import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Req() req: any, @Body() body) {
    // 判断验证码是否正确
    if (
      req.session?.code?.toLocaleLowerCase() !==
      body.captcha?.toLocaleLowerCase()
    ) {
      throw new CustomException(ErrorCode.ERR_10003);
    }
    // return this.authService.login(req.user, req.session?.code);
  }

  @Post('register')
  // @UseGuards(PreviewGuard)
  async register(@Body() user: RegisterUserDto) {
    return this.userService.create(user);
  }
}
