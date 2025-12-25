import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { StorageService, UploadedFile } from '../../common/services/storage.service.js';
import { STORAGE_PURPOSES } from '../../common/constants/storage-purposes.js';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(private readonly storageService: StorageService) {}

  /**
   * Validate file type
   */
  private validateFileType(file: Express.Multer.File, allowedTypes: string[]): void {
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
      );
    }
  }

  /**
   * Validate file size
   */
  private validateFileSize(file: Express.Multer.File, maxSizeMB: number): void {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new BadRequestException(
        `File too large. Maximum size: ${maxSizeMB}MB`
      );
    }
  }

  /**
   * Upload image with specific purpose
   */
  async uploadImage(file: Express.Multer.File, purpose: string = STORAGE_PURPOSES.OTHER): Promise<UploadedFile> {
    this.validateFileType(file, [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ]);
    this.validateFileSize(file, 10); // 10MB max for images

    return await this.storageService.uploadFile(file, purpose);
  }

  /**
   * Upload video with specific purpose
   */
  async uploadVideo(file: Express.Multer.File, purpose: string = STORAGE_PURPOSES.OTHER): Promise<UploadedFile> {
    this.validateFileType(file, [
      'video/mp4',
      'video/webm',
      'video/avi',
      'video/quicktime',
      'video/x-matroska',
    ]);
    this.validateFileSize(file, 100); // 100MB max for videos

    return await this.storageService.uploadFile(file, purpose);
  }

  /**
   * Upload document with specific purpose
   */
  async uploadDocument(file: Express.Multer.File, purpose: string = STORAGE_PURPOSES.OTHER): Promise<UploadedFile> {
    this.validateFileType(file, [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ]);
    this.validateFileSize(file, 20); // 20MB max for documents

    return await this.storageService.uploadFile(file, purpose);
  }

  /**
   * Upload avatar (always goes to avatars directory)
   */
  async uploadAvatar(file: Express.Multer.File): Promise<UploadedFile> {
    this.validateFileType(file, [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ]);
    this.validateFileSize(file, 5); // 5MB max for avatars

    return await this.storageService.uploadFile(file, STORAGE_PURPOSES.AVATARS);
  }

  /**
   * Upload any file (with validation) with specific purpose
   */
  async uploadFile(file: Express.Multer.File, purpose: string = STORAGE_PURPOSES.OTHER): Promise<UploadedFile> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    this.validateFileSize(file, 100); // 100MB max

    return await this.storageService.uploadFile(file, purpose);
  }

  /**
   * Upload multiple files with specific purpose
   */
  async uploadMultipleFiles(files: Express.Multer.File[], purpose: string = STORAGE_PURPOSES.OTHER): Promise<UploadedFile[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    // Validate all files
    files.forEach((file) => {
      this.validateFileSize(file, 100);
    });

    return await this.storageService.uploadMultipleFiles(files, purpose);
  }

  /**
   * Delete file
   */
  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }

    await this.storageService.deleteFile(fileUrl);
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(fileUrls: string[]): Promise<void> {
    if (!fileUrls || fileUrls.length === 0) {
      return;
    }

    await this.storageService.deleteMultipleFiles(fileUrls);
  }

  /**
   * Get storage info
   */
  async getStorageInfo() {
    return await this.storageService.getStorageInfo();
  }

  /**
   * List files
   */
  async listFiles(type?: string) {
    return await this.storageService.listFiles(type);
  }
}
