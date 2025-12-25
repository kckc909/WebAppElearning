import { Module } from '@nestjs/common';
import { StorageService } from './services/storage.service.js';
import { StorageController } from './controllers/storage.controller.js';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class CommonModule {}
