import {
  Controller,
  Post,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../services/storage.service.js';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  /**
   * Upload single file
   * POST /storage/upload
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const uploadedFile = await this.storageService.uploadFile(file);

    return {
      success: true,
      url: uploadedFile.url,
      filename: uploadedFile.fileName,
      path: uploadedFile.url.replace('http://localhost:5000/', ''),
    };
  }

  /**
   * Upload multiple files
   * POST /storage/upload-multiple
   */
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Max 10 files
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadedFiles = await this.storageService.uploadMultipleFiles(files);

    return {
      success: true,
      files: uploadedFiles.map((file) => ({
        url: file.url,
        filename: file.fileName,
        path: file.url.replace('http://localhost:5000/', ''),
      })),
    };
  }

  /**
   * Delete file
   * DELETE /storage/files/:type/:filename
   */
  @Delete('files/:type/:filename')
  async deleteFile(@Param('type') type: string, @Param('filename') filename: string) {
    const fileUrl = this.storageService.getFileUrl(type, filename);
    await this.storageService.deleteFile(fileUrl);

    return {
      success: true,
      message: 'File deleted successfully',
    };
  }

  /**
   * Get storage info
   * GET /storage/info
   */
  @Get('info')
  async getStorageInfo() {
    return await this.storageService.getStorageInfo();
  }

  /**
   * List files
   * GET /storage/files?type=images
   */
  @Get('files')
  async listFiles(@Query('type') type?: string) {
    return await this.storageService.listFiles(type);
  }

  /**
   * Health check
   * GET /storage/health
   */
  @Get('health')
  async healthCheck() {
    const isHealthy = await this.storageService.healthCheck();
    return {
      status: isHealthy ? 'ok' : 'error',
      storageServer: isHealthy ? 'connected' : 'disconnected',
    };
  }
}
