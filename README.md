## 初衷

- 完成个人记账系统服务端部分
- 转型成为全栈工程师的路上
- 产品目标：

  1.账目表 accounts，存账目，里面包含各类账单

  2.账单表 bills，跟账目之间是一对多

  3.用户表 users，包含账目表，多对多

  4.记账类目类型 categorys，跟用户是多对多

## 主要架构

### 主要难点

- 用户表跟账目表的关联,多对多，
  > JoinTable，然后对于查询有啥作用吗？还是不明白
- 账目表跟账单表的关联
- 账目表跟类目表的关联
- 类目表跟账单表的关联
- 如何进行自动化部署,动态传参数？pm2文档看了N遍，基本上都是在 ecosystem.config.js文件中进行配置环境变量，其实本来想通过命令行参数进行设置的，无奈不支持，问了gpt和kimi都是说阔以，但试过了都不行，无奈只能动态设置文件,最终通过动态输出js脚本解决，代码看 **.github/workflows**
- 账单需要根据账本/时间/类目进行过滤，需要相应sql查询
- 查询账单列表的时候，输入202404月的时候，需要查询当月的所有列表,用到**Between**函数
- [最终 小程序端也需要展示，微信登录相关](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

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

## nest快捷命令新建module

```bash
//创建一个 user resource 仓库
nest g res user
```

## License

Nest is [MIT licensed](LICENSE).
