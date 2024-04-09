## 初衷

- 完成个人记账系统服务端部分
- 转型成为全栈工程师的路上
- 签发jwt
- 验证jwt

## 主要架构

- @nestjs/typeorm
- @nestjs/jwt
- @nestjs/mapped-types

## 主要模块

- common/exceptions
- common/filter
- common/interceptor
- common/pipe
- common/guard
- modules/auth
- modules/user

## 二方库

- bcrypt.js 加解密密码，主要用到俩个api

```js
import { compareSync, hashSync } from 'bcryptjs';
hashSync(password); // 加密
compareSync(password, user.password); // 比较密码
```

- [映射类型: @nestjs/mapped-types](https://docs.nestjs.cn/10/techniques?id=%e6%98%a0%e5%b0%84%e7%b1%bb%e5%9e%8b)

```ts
import { PickType } from '@nestjs/mapped-types';
export class UpdatePasswordDto extends PickType(CreateUserDto, ['password']) {}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
