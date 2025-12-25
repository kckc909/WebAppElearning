import { Injectable, BadRequestException } from '@nestjs/common';
import { MediaType, MediaProvider, MediaInput, ProcessedMedia } from './media.types.js';

@Injectable()
export class MediaProcessorService {
  
  // Whitelist of safe domains
  private readonly SAFE_DOMAINS = [
    'youtube.com',
    'youtu.be',
    'vimeo.com',
    'drive.google.com',
    'firebasestorage.googleapis.com',
    'cloudinary.com',
    'imgur.com',
  ];

  // MIME type mappings
  private readonly MIME_TYPES = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    
    // Videos
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogv': 'video/ogg',
    'mov': 'video/quicktime',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'oga': 'audio/ogg',
  };

  /**
   * Main processing function - validates and normalizes media
   */
  async processMedia(input: MediaInput): Promise<ProcessedMedia> {
    const url = input.url.trim();
    
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    // Validate URL format
    if (!this.isValidUrl(url)) {
      throw new BadRequestException('Invalid URL format');
    }

    // Check if URL is safe
    if (!this.isSafeUrl(url)) {
      throw new BadRequestException('URL is not from a trusted source');
    }

    // Detect provider
    const provider = this.detectProvider(url);
    
    // Detect media type
    const type = this.detectMediaType(url, provider);
    
    // Normalize URL for rendering
    const render_url = this.normalizeUrl(url, provider, type);
    
    // Generate preview URL if possible
    const preview_url = this.generatePreviewUrl(url, provider, type);
    
    // Extract metadata
    const mime_type = this.getMimeType(url);
    
    return {
      type,
      provider,
      original_url: url,
      render_url,
      preview_url,
      mime_type,
      metadata: {
        provider,
        type,
        is_external: provider !== MediaProvider.FIREBASE,
        is_safe: true,
        processed_at: new Date().toISOString(),
      }
    };
  }

  /**
   * Validate URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if URL is from safe domain
   */
  private isSafeUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      // Check if domain is in whitelist
      return this.SAFE_DOMAINS.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  }

  /**
   * Detect media provider from URL
   */
  private detectProvider(url: string): MediaProvider {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
      return MediaProvider.YOUTUBE;
    }
    
    if (urlLower.includes('vimeo.com')) {
      return MediaProvider.VIMEO;
    }
    
    if (urlLower.includes('drive.google.com')) {
      return MediaProvider.GOOGLE_DRIVE;
    }
    
    if (urlLower.includes('firebasestorage.googleapis.com')) {
      return MediaProvider.FIREBASE;
    }
    
    return MediaProvider.DIRECT_LINK;
  }

  /**
   * Detect media type from URL and provider
   */
  private detectMediaType(url: string, provider: MediaProvider): MediaType {
    // YouTube and Vimeo are always video
    if (provider === MediaProvider.YOUTUBE || provider === MediaProvider.VIMEO) {
      return MediaType.VIDEO;
    }

    // Check file extension
    const extension = this.getFileExtension(url);
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return MediaType.IMAGE;
    }
    
    if (['mp4', 'webm', 'ogg', 'mov'].includes(extension)) {
      return MediaType.VIDEO;
    }
    
    if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return MediaType.AUDIO;
    }
    
    if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
      return MediaType.DOCUMENT;
    }
    
    return MediaType.UNKNOWN;
  }

  /**
   * Normalize URL for direct rendering
   */
  private normalizeUrl(url: string, provider: MediaProvider, type: MediaType): string {
    switch (provider) {
      case MediaProvider.YOUTUBE:
        return this.normalizeYouTubeUrl(url);
      
      case MediaProvider.VIMEO:
        return this.normalizeVimeoUrl(url);
      
      case MediaProvider.GOOGLE_DRIVE:
        return this.normalizeGoogleDriveUrl(url);
      
      default:
        return url;
    }
  }

  /**
   * Convert YouTube watch URL to embed URL
   */
  private normalizeYouTubeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      
      // Handle youtu.be short links
      if (urlObj.hostname === 'youtu.be') {
        const videoId = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Handle youtube.com/watch links
      if (urlObj.pathname === '/watch') {
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      
      // Already embed URL
      if (urlObj.pathname.startsWith('/embed/')) {
        return url;
      }
      
      return url;
    } catch {
      return url;
    }
  }

  /**
   * Convert Vimeo URL to embed URL
   */
  private normalizeVimeoUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.pathname.split('/').filter(Boolean)[0];
      
      if (videoId && !urlObj.pathname.includes('/video/')) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
      
      return url;
    } catch {
      return url;
    }
  }

  /**
   * Convert Google Drive URL to direct view URL
   */
  private normalizeGoogleDriveUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      
      // Extract file ID from various Google Drive URL formats
      let fileId: string | null = null;
      
      if (urlObj.pathname.includes('/file/d/')) {
        fileId = urlObj.pathname.split('/file/d/')[1].split('/')[0];
      } else if (urlObj.searchParams.has('id')) {
        fileId = urlObj.searchParams.get('id');
      }
      
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      
      return url;
    } catch {
      return url;
    }
  }

  /**
   * Generate preview/thumbnail URL
   */
  private generatePreviewUrl(url: string, provider: MediaProvider, type: MediaType): string | undefined {
    switch (provider) {
      case MediaProvider.YOUTUBE:
        const ytVideoId = this.extractYouTubeVideoId(url);
        return ytVideoId ? `https://img.youtube.com/vi/${ytVideoId}/maxresdefault.jpg` : undefined;
      
      case MediaProvider.VIMEO:
        // Vimeo thumbnails require API call, return undefined for now
        return undefined;
      
      default:
        // For images, preview is the same as render URL
        return type === MediaType.IMAGE ? url : undefined;
    }
  }

  /**
   * Extract YouTube video ID from URL
   */
  private extractYouTubeVideoId(url: string): string | null {
    try {
      const urlObj = new URL(url);
      
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      
      if (urlObj.searchParams.has('v')) {
        return urlObj.searchParams.get('v');
      }
      
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/embed/')[1];
      }
      
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get file extension from URL
   */
  private getFileExtension(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const parts = pathname.split('.');
      return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
    } catch {
      return '';
    }
  }

  /**
   * Get MIME type from URL
   */
  private getMimeType(url: string): string | undefined {
    const extension = this.getFileExtension(url);
    return this.MIME_TYPES[extension];
  }

  /**
   * Batch process multiple media items
   */
  async processMediaBatch(inputs: MediaInput[]): Promise<ProcessedMedia[]> {
    const results = await Promise.allSettled(
      inputs.map(input => this.processMedia(input))
    );
    
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<ProcessedMedia>).value);
  }
}
