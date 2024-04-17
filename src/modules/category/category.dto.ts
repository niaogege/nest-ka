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
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: '类型名称不能为空' })
  categoryName: string;

  @IsNumber()
  @IsNotEmpty({ message: '用户id不能为空,userId=0代表默认类目' })
  // @IsOptional()
  userId: number;

  @IsNumber()
  @IsOptional()
  payType: number;

  @IsNumber()
  @IsNotEmpty({
    message: '新建账单必须要传入账本',
  })
  shareAccountId: number;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
