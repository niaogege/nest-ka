import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BillModule } from './modules/bill/bill.module';
import { CategoryModule } from './modules/category/category.module';
import { AccountModule } from './modules/account/account.module';
@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    /**typeorm配置 */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          host: process.env.DB_HOST || configService.get('DB_HOST'),
          port: 3306,
          username: process.env.DB_USER || configService.get('DB_USER'),
          password: process.env.DB_PWD || configService.get('DB_PWD'),
          database: process.env.DB_DATABASE || configService.get('DB_DATABASE'),
          synchronize: false,
          timezone: '+08:00',
        };
      },
    }),
    UserModule,
    AuthModule,
    BillModule,
    CategoryModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
