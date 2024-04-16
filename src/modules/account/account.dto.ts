import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Length,
  IsDate,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty({ message: '账目名称不能为空' })
  accountName: string;

  @IsNumber()
  @IsNotEmpty({ message: '账目拥有者不能缺少' })
  userId: number;

  // 账目的分享者名单
  @IsString()
  @IsOptional()
  sharedUserIds: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
