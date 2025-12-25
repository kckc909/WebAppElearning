import { Module } from '@nestjs/common';
import { MediaController } from './media.controller.js';
import { LessonMediaController } from './lesson-media.controller.js';
import { MediaAssetsService } from './media-assets.service.js';
import { MediaProcessorService } from './media-processor.service.js';
import { LessonMediaService } from './lesson-media.service.js';
import { PrismaService } from '../../../prisma.service.js';

@Module({
  controllers: [MediaController, LessonMediaController],
  providers: [MediaAssetsService, MediaProcessorService, LessonMediaService, PrismaService],
  exports: [MediaAssetsService, MediaProcessorService, LessonMediaService],
})
export class MediaModule {}
