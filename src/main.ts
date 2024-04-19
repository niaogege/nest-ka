import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import TransformInterceptor from '@/common/interceptor/transform.interceptor';
import HttpExceptionFilter from '@/common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局前缀
  app.setGlobalPrefix('api');

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // 响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 请求过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT || 7001);
  console.log(process.env.DB_HOST, 'process.env.DB_HOST');
  console.log(process.env.JWT_SECRET, 'process.env.DB_DATABASE');
}
bootstrap();
