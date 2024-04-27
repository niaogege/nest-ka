import { UploadService } from './upload.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      // 限制图片大小
      limits: {
        fileSize: 1024 * 1024 * 2, // 2M
      },
      // 限制图片格式
      fileFilter(req, file, callback) {
        const extname = path.extname(file.originalname);
        if (['.png', '.jpg', '.gif', '.jpeg'].includes(extname)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('上传类型有误：只能上传图片！'),
            false,
          );
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
