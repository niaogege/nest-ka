import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './upload.dto';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }
}
