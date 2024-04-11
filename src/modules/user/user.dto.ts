import { PartialType, PickType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(3, 20, {
    message: `用户名长度必须大于$constraint1到$constraint2之间，当前传递的值是$value`,
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: `密码长度必须大于$constraint1到$constraint2之间` })
  password: string;

  @IsString()
  @IsOptional()
  signature?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  // 个人创建的消费种类类型
  @IsOptional()
  @IsArray()
  typeIds?: number[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordDto extends PickType(CreateUserDto, ['password']) {}
