import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import * as path from 'path';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join('./public'),
        // destination: path.join(__dirname, '../../uploads'),
        filename: (_, file, cb) => {
          console.log(file, 'file');
          const names = file.originalname.split('.');
          const fileName = `${names[0] + new Date().getTime() + path.extname(file.originalname)}`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
