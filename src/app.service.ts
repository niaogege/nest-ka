import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.DB_HOST, 'process.env.DB_HOST');
    console.log(process.env.DB_USER, 'process.env.DB_USER');
    return 'Hello World!';
  }
}
