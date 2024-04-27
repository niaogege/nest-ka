import { PartialType } from '@nestjs/mapped-types';
export class CreateUploadDto {}

export class UpdateUploadDto extends PartialType(CreateUploadDto) {}
