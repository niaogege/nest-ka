import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  // @IsNotEmpty({ message: '用户名不能为空' })
  @IsOptional()
  username?: string;

  @IsString()
  @IsNotEmpty({ message: 'openId不能为空' })
  openid: string;

  // @IsString()
  // @IsNotEmpty({ message: '密码不能为空' })
  // password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: '旧密码不能为空' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}
