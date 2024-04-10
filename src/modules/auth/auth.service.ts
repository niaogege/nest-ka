import { Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

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
    const user = await this.userService.findByUsername(loginDto.username);
    const payload = {
      username: loginDto.username,
      password: loginDto.password,
      userId: user.id,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      type: 'Bearer',
    };
  }
}
