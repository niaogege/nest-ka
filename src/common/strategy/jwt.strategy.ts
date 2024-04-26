import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../modules/user/user.entities';
import { UserService } from '../../modules/user/user.service';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  async validate(payload: User) {
    const existUser = await this.userService.findByUseropenid(payload.openid);
    if (!existUser) throw new CustomException(ErrorCode.ERR_11002);
    return existUser;
  }
}
