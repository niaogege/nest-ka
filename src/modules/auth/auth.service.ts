import { Injectable } from '@nestjs/common';
import { RegisterUserDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
