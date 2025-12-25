import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service.js';
import { STORAGE_PURPOSES } from '../../common/constants/storage-purposes.js';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Upload single image
   * POST /api/upload/image
   * Body: { purpose?: string } - Optional purpose (thumbnails, courses, banners, etc.)
   */
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadImage(
      file,
      purpose || STORAGE_PURPOSES.OTHER,
    );

    return {
      success: true,
      message: 'Image uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload single video
   * POST /api/upload/video
   * Body: { purpose?: string } - Optional purpose (courses, lessons, previews, etc.)
   */
  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadVideo(
      file,
      purpose || STORAGE_PURPOSES.OTHER,
    );

    return {
      success: true,
      message: 'Video uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload single document
   * POST /api/upload/document
   * Body: { purpose?: string } - Optional purpose (pdfs, assignments, materials, etc.)
   */
  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadDocument(
      file,
      purpose || STORAGE_PURPOSES.OTHER,
    );

    return {
      success: true,
      message: 'Document uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload avatar (always goes to avatars directory)
   * POST /api/upload/avatar
   */
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadAvatar(file);

    return {
      success: true,
      message: 'Avatar uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload any file
   * POST /api/upload/file
   * Body: { purpose?: string } - Optional purpose
   */
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('purpose') purpose?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadFile(
      file,
      purpose || STORAGE_PURPOSES.OTHER,
    );

    return {
      success: true,
      message: 'File uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload multiple files
   * POST /api/upload/multiple
   * Body: { purpose?: string } - Optional purpose for all files
   */
  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Max 10 files
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('purpose') purpose?: string,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const uploadedFiles = await this.uploadService.uploadMultipleFiles(
      files,
      purpose || STORAGE_PURPOSES.OTHER,
    );

    return {
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles,
    };
  }

  /**
   * Delete file
   * DELETE /api/upload/file
   */
  @Delete('file')
  async deleteFile(@Body('fileUrl') fileUrl: string) {
    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }

    await this.uploadService.deleteFile(fileUrl);

    return {
      success: true,
      message: 'File deleted successfully',
    };
  }

  /**
   * Delete multiple files
   * DELETE /api/upload/multiple
   */
  @Delete('multiple')
  async deleteMultiple(@Body('fileUrls') fileUrls: string[]) {
    if (!fileUrls || fileUrls.length === 0) {
      throw new BadRequestException('File URLs are required');
    }

    await this.uploadService.deleteMultipleFiles(fileUrls);

    return {
      success: true,
      message: `${fileUrls.length} files deleted successfully`,
    };
  }

  /**
   * Get storage info
   * GET /api/upload/info
   */
  @Get('info')
  async getStorageInfo() {
    const info = await this.uploadService.getStorageInfo();
    return info;
  }

  /**
   * List files
   * GET /api/upload/files?type=images
   */
  @Get('files')
  async listFiles(@Query('type') type?: string) {
    const files = await this.uploadService.listFiles(type);
    return files;
  }

  /**
   * Upload thumbnail (specific endpoint for thumbnails)
   * POST /api/upload/thumbnail
   */
  @Post('thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadImage(
      file,
      STORAGE_PURPOSES.THUMBNAILS,
    );

    return {
      success: true,
      message: 'Thumbnail uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload course banner (specific endpoint for course banners)
   * POST /api/upload/course-banner
   */
  @Post('course-banner')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCourseBanner(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadImage(
      file,
      STORAGE_PURPOSES.COURSE_IMAGES,
    );

    return {
      success: true,
      message: 'Course banner uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload lesson video (specific endpoint for lesson videos)
   * POST /api/upload/lesson-video
   */
  @Post('lesson-video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLessonVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadVideo(
      file,
      STORAGE_PURPOSES.LESSON_VIDEOS,
    );

    return {
      success: true,
      message: 'Lesson video uploaded successfully',
      file: uploadedFile,
    };
  }

  /**
   * Upload course preview video (specific endpoint for course preview videos)
   * POST /api/upload/course-preview
   */
  @Post('course-preview')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCoursePreview(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const uploadedFile = await this.uploadService.uploadVideo(
      file,
      STORAGE_PURPOSES.PREVIEW_VIDEOS,
    );

    return {
      success: true,
      message: 'Course preview video uploaded successfully',
      file: uploadedFile,
    };
  }
}
