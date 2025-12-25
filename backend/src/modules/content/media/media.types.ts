// Media Types and Enums
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
  AUDIO = 'audio',
  EXTERNAL = 'external',
  UNKNOWN = 'unknown'
}

export enum MediaProvider {
  FIREBASE = 'firebase',
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  GOOGLE_DRIVE = 'drive',
  DIRECT_LINK = 'direct',
  UNKNOWN = 'unknown'
}

export enum MediaStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
  PROCESSING = 'processing',
  ERROR = 'error'
}

// Media Input from Frontend
export interface MediaInput {
  url: string; // Raw URL from user (upload result or external link)
  context?: string; // Where this media is used (lesson_block, course_thumbnail, etc.)
  metadata?: Record<string, any>; // Optional metadata from frontend
}

// Processed Media Output (saved to DB)
export interface ProcessedMedia {
  type: MediaType;
  provider: MediaProvider;
  original_url: string;
  render_url: string; // URL ready for frontend rendering
  preview_url?: string; // Thumbnail/preview if available
  mime_type?: string;
  file_size?: number;
  duration?: number; // For video/audio
  dimensions?: { width: number; height: number }; // For image/video
  metadata: {
    provider: MediaProvider;
    type: MediaType;
    is_external: boolean;
    is_safe: boolean;
    [key: string]: any;
  };
}

// Media Block for Lesson Content
export interface MediaBlockData {
  media_id?: number; // Reference to media_assets table
  type: MediaType;
  provider: MediaProvider;
  render_url: string;
  preview_url?: string;
  caption?: string;
  alt_text?: string;
  metadata: Record<string, any>;
}
