import { SetMetadata } from '@nestjs/common';

// 被标记的接口不需要身份验证
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
