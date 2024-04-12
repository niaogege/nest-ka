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
  // @IsNotEmpty({ message: '用户id不能为空' })
  @IsOptional()
  ownerId: number;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
