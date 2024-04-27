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

  @IsNumber()
  @IsNotEmpty({ message: '消费类目Id不能为空' })
  categoryId: number;

  @IsString()
  @IsOptional({ message: '记账备注' })
  remark?: string;

  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空' })
  userId: number;

  @IsNumber()
  @IsOptional({ message: '支出1或者收入2或者不计收支3' })
  payType: number;

  @IsNumber()
  @IsNotEmpty({ message: '账目id不能为空' })
  accountId: number;
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

  @IsNumber()
  @IsNotEmpty({ message: '账目id不能为空' })
  accountId: number;

  @IsNumber()
  @IsNotEmpty({ message: '过滤的开始时间' })
  startTime: string;

  @IsNumber()
  @IsNotEmpty({ message: '过滤的结束时间' })
  endTime: string;

  @IsOptional()
  categoryId?: number;
}
