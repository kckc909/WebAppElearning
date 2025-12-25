import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import { Readable } from 'stream';

export interface UploadedFile {
  originalName: string;
  fileName: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: string;
}

export interface StorageInfo {
  success: boolean;
  storage: {
    totalSize: string;
    totalSizeBytes: number;
  };
  files: {
    images: number;
    videos: number;
    documents: number;
    avatars: number;
  };
}

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly storageUrl: string;
  private readonly apiKey: string;
  private readonly enabled: boolean;

  constructor(private configService: ConfigService) {
    this.storageUrl = this.configService.get<string>('STORAGE_SERVER_URL') || 'http://localhost:5000';
    this.apiKey = this.configService.get<string>('STORAGE_API_KEY') || '';
    this.enabled = this.configService.get<string>('STORAGE_ENABLED') !== 'false';

    if (!this.apiKey) {
      this.logger.warn('STORAGE_API_KEY is not configured');
    }

    this.logger.log(`Storage Service initialized: ${this.storageUrl} (enabled: ${this.enabled})`);
  }

  /**
   * Check if storage service is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.storageUrl}/health`, {
        timeout: 3000,
      });
      return response.data.status === 'ok';
    } catch (error) {
      this.logger.error('Storage health check failed:', error.message);
      return false;
    }
  }

  /**
   * Upload single file to storage server
   * @param file - File to upload
   * @param purpose - Purpose/context: 'thumbnails', 'avatars', 'courses', 'lessons', etc.
   */
  async uploadFile(file: Express.Multer.File, purpose: string = 'other'): Promise<UploadedFile> {
    if (!this.enabled) {
      throw new BadRequestException('Storage service is disabled');
    }

    try {
      const formData = new FormData();

      // If file is in memory (buffer)
      if (file.buffer) {
        const stream = Readable.from(file.buffer);
        formData.append('file', stream, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      }
      // If file is on disk (path)
      else if (file.path) {
        formData.append('file', fs.createReadStream(file.path), {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      } else {
        throw new BadRequestException('Invalid file object');
      }

      // Add purpose to ensure file goes to correct directory
      formData.append('purpose', purpose);

      const response = await axios.post(`${this.storageUrl}/upload`, formData, {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': this.apiKey,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 60000, // 60 seconds
      });

      if (response.data.success) {
        this.logger.log(`File uploaded to ${purpose}: ${response.data.file.fileName}`);
        return response.data.file;
      } else {
        throw new BadRequestException(response.data.error || 'Upload failed');
      }
    } catch (error) {
      this.handleError('Upload', error);
    }
  }

  /**
   * Upload multiple files to storage server
   * @param files - Files to upload
   * @param purpose - Purpose/context for all files
   */
  async uploadMultipleFiles(files: Express.Multer.File[], purpose: string = 'other'): Promise<UploadedFile[]> {
    if (!this.enabled) {
      throw new BadRequestException('Storage service is disabled');
    }

    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    try {
      const formData = new FormData();

      files.forEach((file) => {
        if (file.buffer) {
          const stream = Readable.from(file.buffer);
          formData.append('files', stream, {
            filename: file.originalname,
            contentType: file.mimetype,
          });
        } else if (file.path) {
          formData.append('files', fs.createReadStream(file.path), {
            filename: file.originalname,
            contentType: file.mimetype,
          });
        }
      });

      // Add purpose for all files
      formData.append('purpose', purpose);

      const response = await axios.post(`${this.storageUrl}/upload-multiple`, formData, {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': this.apiKey,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000, // 120 seconds for multiple files
      });

      if (response.data.success) {
        this.logger.log(`${response.data.files.length} files uploaded to ${purpose}`);
        return response.data.files;
      } else {
        throw new BadRequestException(response.data.error || 'Upload failed');
      }
    } catch (error) {
      this.handleError('Upload multiple', error);
    }
  }

  /**
   * Delete file from storage server
   */
  async deleteFile(fileUrl: string): Promise<void> {
    if (!this.enabled) {
      this.logger.warn('Storage service is disabled, skipping delete');
      return;
    }

    if (!fileUrl) {
      throw new BadRequestException('File URL is required');
    }

    try {
      // Parse URL to get type and filename
      // Example: http://localhost:5000/files/images/1234567890-abc123.jpg
      const urlParts = fileUrl.split('/');
      const filename = urlParts.pop();
      const type = urlParts.pop();

      if (!filename || !type || type === 'files') {
        throw new BadRequestException('Invalid file URL format');
      }

      const response = await axios.delete(`${this.storageUrl}/api/files/${type}/${filename}`, {
        headers: {
          'x-api-key': this.apiKey,
        },
        timeout: 10000,
      });

      if (response.data.success) {
        this.logger.log(`File deleted: ${filename}`);
      } else {
        throw new BadRequestException(response.data.error || 'Delete failed');
      }
    } catch (error) {
      this.handleError('Delete', error);
    }
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(fileUrls: string[]): Promise<void> {
    if (!this.enabled) {
      this.logger.warn('Storage service is disabled, skipping delete');
      return;
    }

    const deletePromises = fileUrls
      .filter((url) => url)
      .map((url) => this.deleteFile(url).catch((error) => {
        this.logger.error(`Failed to delete ${url}:`, error.message);
      }));

    await Promise.all(deletePromises);
  }

  /**
   * Get storage info
   */
  async getStorageInfo(): Promise<StorageInfo> {
    if (!this.enabled) {
      throw new BadRequestException('Storage service is disabled');
    }

    try {
      const response = await axios.get(`${this.storageUrl}/api/info`, {
        headers: {
          'x-api-key': this.apiKey,
        },
        timeout: 5000,
      });

      return response.data;
    } catch (error) {
      this.handleError('Get storage info', error);
    }
  }

  /**
   * List all files
   */
  async listFiles(type?: string) {
    if (!this.enabled) {
      throw new BadRequestException('Storage service is disabled');
    }

    try {
      const url = type
        ? `${this.storageUrl}/api/files?type=${type}`
        : `${this.storageUrl}/api/files`;

      const response = await axios.get(url, {
        headers: {
          'x-api-key': this.apiKey,
        },
        timeout: 10000,
      });

      return response.data;
    } catch (error) {
      this.handleError('List files', error);
    }
  }

  /**
   * Get file URL (for serving through backend)
   */
  getFileUrl(type: string, filename: string): string {
    return `${this.storageUrl}/files/${type}/${filename}`;
  }

  /**
   * Handle errors consistently
   */
  private handleError(operation: string, error: any): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const message = axiosError.response?.data?.['error'] || axiosError.message;
      this.logger.error(`${operation} error:`, message);

      if (axiosError.response?.status === 401) {
        throw new BadRequestException('Storage authentication failed');
      } else if (axiosError.response?.status === 400) {
        throw new BadRequestException(message);
      } else if (axiosError.code === 'ECONNREFUSED') {
        throw new BadRequestException('Storage server is not available');
      }

      throw new BadRequestException(`${operation} failed: ${message}`);
    }

    this.logger.error(`${operation} error:`, error.message);
    throw new BadRequestException(`${operation} failed: ${error.message}`);
  }
}
