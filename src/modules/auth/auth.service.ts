import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, catchError, map } from 'rxjs';
import { LoginDto } from './auth.dto';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private logger: Logger = new Logger(AuthService.name);
  // 注册
  async create(loginDto: LoginDto) {
    const user = await this.userService.create(loginDto);
    return user;
  }
  // 登录
  // 一键登入，未注册则先注册
  async login(loginDto: LoginDto) {
    let user = await this.userService.findByUseropenid(loginDto.openid);
    if (!user) {
      user = await this.create(loginDto);
    }
    const payload = {
      username: user.username,
      openid: loginDto.openid,
      userId: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      ...user,
    };
  }

  // miniProgram
  async loginMp(code: string) {
    this.logger.log(code);
    const appId = process.env.APP_ID || this.configService.get('APP_ID');
    const appSecret =
      process.env.APP_SECRET || this.configService.get('APP_SECRET');
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    this.logger.log(url);
    const res = await firstValueFrom(
      this.httpService
        .get(url)
        .pipe(map((res) => res.data))
        .pipe(
          catchError((err) => {
            this.logger.error(err);
            throw '获取微信openid失败';
          }),
        ),
    );
    this.logger.log(res);
    // 调登录接口
    // {
    //   "session_key": "vs4JZ5VWOBwva3LFJ721zA==",
    //   "openid": "oTRdR470ZMyenvaYnb9AmU0yvV0w"
    // }
    return await this.login({
      openid: res.openid,
    });
  }
}
