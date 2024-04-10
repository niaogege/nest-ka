import { PartialType, PickType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
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

export class CreateBillDto {
  @IsNumber()
  @IsNotEmpty({ message: '账单金额不能为空' })
  amount: number;

  @IsString()
  @IsNotEmpty({ message: '消费类型type不能为空' })
  @Length(2, 20, {
    message: `消费类型长度必须大于$constraint1到$constraint2之间`,
  })
  typeName: string;

  @IsNumber()
  @IsNotEmpty({ message: '消费类型Id不能为空' })
  typeId: number;

  @IsString()
  @IsOptional()
  remark?: string;

  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: number;
}

export class UpdateBillDto extends CreateBillDto {}

export class QueryBillDto {
  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: number;

  @Allow()
  size: number;

  @Allow()
  page: number;
}
