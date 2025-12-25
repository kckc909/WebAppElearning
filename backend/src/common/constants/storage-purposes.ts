/**
 * Storage purposes - must match storage server's FILE_STRUCTURE
 * These constants ensure files are stored in the correct directories
 */
export const STORAGE_PURPOSES = {
  // Images
  AVATARS: 'avatars',
  COURSE_IMAGES: 'courses',
  CLASS_IMAGES: 'classes',
  THUMBNAILS: 'thumbnails',
  BANNERS: 'banners',
  
  // Videos
  COURSE_VIDEOS: 'courses',
  LESSON_VIDEOS: 'lessons',
  PREVIEW_VIDEOS: 'previews',
  
  // Documents
  PDFS: 'pdfs',
  ASSIGNMENTS: 'assignments',
  MATERIALS: 'materials',
  CERTIFICATES: 'certificates',
  
  // Excels
  REPORTS: 'reports',
  DATA: 'data',
  
  // Audios
  LESSON_AUDIOS: 'lessons',
  
  // Archives
  BACKUPS: 'backups',
  EXPORTS: 'exports',
  
  // Default
  OTHER: 'other',
} as const;

export type StoragePurpose = typeof STORAGE_PURPOSES[keyof typeof STORAGE_PURPOSES];

/**
 * Helper to validate if a purpose is valid
 */
export function isValidPurpose(purpose: string): purpose is StoragePurpose {
  return Object.values(STORAGE_PURPOSES).includes(purpose as StoragePurpose);
}

/**
 * Get purpose for specific use cases
 */
export const getPurposeForContext = {
  userAvatar: () => STORAGE_PURPOSES.AVATARS,
  courseThumbnail: () => STORAGE_PURPOSES.THUMBNAILS,
  courseBanner: () => STORAGE_PURPOSES.COURSE_IMAGES,
  coursePreviewVideo: () => STORAGE_PURPOSES.PREVIEW_VIDEOS,
  lessonVideo: () => STORAGE_PURPOSES.LESSON_VIDEOS,
  lessonMaterial: () => STORAGE_PURPOSES.MATERIALS,
  assignment: () => STORAGE_PURPOSES.ASSIGNMENTS,
  certificate: () => STORAGE_PURPOSES.CERTIFICATES,
};
