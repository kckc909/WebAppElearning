import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller.js';
import { UploadService } from './upload.service.js';
import { StorageService } from '../../common/services/storage.service.js';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [UploadService, StorageService],
  exports: [UploadService, StorageService],
})
export class UploadModule {}
