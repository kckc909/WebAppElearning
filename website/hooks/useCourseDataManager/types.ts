/**
 * Unified Course Data Types - Re-exports
 * 
 * This file re-exports types from course-data.types.ts for use in useCourseDataManager hooks
 */

// Direct re-exports (Vite handles these better)
export type {
  CourseDataState,
  CourseInfo,
  Section,
  Lesson,
  LessonContent,
  LessonBlock,
  LessonMetadata,
  PendingChanges,
  ChangeRecord,
  SaveRequest,
  UseCourseDataManagerReturn,
} from '../../types/course-data.types';

export {
  generateTempId,
  isTempId,
  createEmptyPendingChanges,
} from '../../types/course-data.types';

export const API_BASE_URL = (import.meta as any).env?.VITE_BACK_END_API_PATH || 'http://localhost:4000';
