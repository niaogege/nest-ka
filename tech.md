# 技术

### 主要模块

- common/exceptions
- common/filter
- common/interceptor
- common/pipe
- common/guard
- modules/auth
- modules/user

### 本地校验

```ts
import { AuthGuard } from '@nestjs/passport';
```

### 二方库

- @nestjs/passport passport passport-local
  local.strategy.ts文件来写**本地验证策略**代码

- @nestjs/jwt
  服务器验证成功后应该签发一个身份标识Token的东西给客户端,这样以后客户端就拿着这个标识来证明自己的身份。而标识用户身份的方式有多种，这里我们采用jwt方式

- passport-jwt @types/passport-jwt
  实现token认证,如何取出token以及根据token拿到用户信息

```js
  ExtractJwt提供多种方式从请求中提取JWT，常见的方式有以下几种：
  fromHeader： 在Http 请求头中查找JWT
  fromBodyField: 在请求的Body字段中查找JWT
  fromAuthHeaderAsBearerToken：在授权标头带有Bearer方案中查找JWT
  我们采用的是fromAuthHeaderAsBearerToken，后面请求操作演示中可以看到，发送的请求头中需要带上,这种方案也是现在很多后端比较青睐的：
```

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

## [小程序端登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

无需注册，那如何登录呢？通常是打开小程序端，微信端肯定是已经登录过的,那现在如何在服务端记录用户数据？

```ts
1.客户端调用api向微信请求授权，获取临时票据（code），向开发者业务服务器发起网络请求
2.api: const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;

https://api.weixin.qq.com/sns/jscode2session?appid=wx8b727ea944b22161&secret=5a37b2760e44ba342f03755135c29537&js_code=0e3EIXZv3P1BE234jF2w3ybw1x0EIXZm&grant_type=authorization_code

// {"session_key":"XTzVgDk/cPV/XFA7txZouQ==","openid":"oTRdR470ZMyenvaYnb9AmU0yvV0w"}
```

说明

- 调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
- 调用 **auth.code2Session** 接口，换取 用户唯一标识 OpenID 、 用户在微信开放平台账号下的唯一标识UnionID（若当前小程序已绑定到微信开放平台账号） 和 会话密钥 session_key。
- 之后开发者服务器可以根据用户标识来生成**自定义登录态**，用于后续业务逻辑中前后端交互时识别用户身份？把openId存入数据库中的User表，作为用户的唯一标识符
- 拿到openid之后，在user表中判断是否已经注册过，注册过直接调登录接口返回token,未注册则需要先注册在调登录接口，

### 微信小程序前后端请求过程

- 1.除了注册和登录接口，其他所有接口需要头部加上header:token参数
- 2.如果没有，则需要一键登录，
- 3.首先去调/auth/mp，拿到openid,然后调/auth/login接口，拿到token
- 4.前端请求每次都需带上token,如果token过期，则需要重新去掉 调/auth/mp->/auth/login 拿到token
- 5.本地如何进行调试呢

### 图片上传服务

小程序更换头像的时候需要用到，把微信里的临时路径图片换成自己服务器里的图片地址？

## 问题记录

- post/get/delete请求参数不合法，如何规避
- 邀请他人记账，这个怎么做的?邀请其实就是共享，更新账本信息，拿到邀请人的信息即可

## 参考

- [NestJS 简单入门（三）用户登录与JWT](https://juejin.cn/post/7257518510531330106#heading-3)
- [Nest.js 实战系列二-手把手带你-实现注册、扫码登录、jwt认证等](https://juejin.cn/post/7044708915438682148?searchId=20240407102607D2C754E842DCD37A5184#heading-4)
- [一文看懂小程序一键登录/注册，快速创建用户体系](https://juejin.cn/post/7152682507916771358?searchId=20240424193108D4A8E073DE28E2A7A657#heading-21)

## yml

- 遇到一个问题，如何保存微信头像的图片资源，保存在哪里合适呢

```bash
     first_ssh: |-
        cd $TARGET_DIR
        rm -rf $TARGET_DIR
        mkdir -p $TARGET_DIR
```
