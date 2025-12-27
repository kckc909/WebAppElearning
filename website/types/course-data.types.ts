/**
 * Section in a course
 */
export interface Section {
  id: string;                    // Section ID (can be temp ID)
  title: string;                 // Section title
  order_index: number;           // Display order (0-based)
  lessons: Lesson[];             // Lessons in this section

  // Metadata flags for tracking changes
  _isNew?: boolean;              // True if created locally, not yet synced
  _isModified?: boolean;         // True if modified locally, not yet synced
  _isDeleted?: boolean;          // True if marked for deletion
}

/**
 * Lesson in a section
 */
export interface Lesson {
  id: string;                    // Lesson ID (can be temp ID)
  section_id: string;            // Parent section ID
  title: string;                 // Lesson title
  description?: string;          // Lesson description/objective (optional)
  order_index: number;           // Display order within section (0-based)
  layout: string;                // Layout type: 'single', 'split', 'sidebar-left', etc.
  duration?: number;             // Duration in minutes (optional)
  status?: string;               // Status: 'draft', 'published' (optional)

  // Metadata flags
  _isNew?: boolean;
  _isModified?: boolean;
  _isDeleted?: boolean;
}

/**
 * Lesson content (blocks and metadata)
 * This is lazy-loaded when a lesson is selected
 */
export interface LessonContent {
  versionId: number;             // Lesson version ID
  layoutType: string;            // Layout type (matches lesson.layout)
  blocks: LessonBlock[];         // Content blocks
  metadata: LessonMetadata;      // Lesson metadata

  // Metadata flags
  _isModified?: boolean;         // True if blocks or metadata modified
}

/**
 * Content block in a lesson
 */
export interface LessonBlock {
  id: number;                    // Block ID (backend-generated)
  type: string;                  // Block type: 'text', 'video', 'quiz', etc.
  slot_id: string;               // Slot ID: 'main', 'left', 'right', etc.
  order_index: number;           // Order within slot
  content: Record<string, any>;  // Block-specific content
  settings: Record<string, any>; // Block-specific settings
  lesson_version_id: number;     // Parent lesson version ID
  created_at: Date;
  updated_at: Date;
}

/**
 * Lesson metadata
 */
export interface LessonMetadata {
  objective?: string;            // Learning objective
  estimated_time?: number;       // Estimated time in minutes
  is_optional?: boolean;         // Is this lesson optional?
  container_width?: string;      // Container width class
  gap_size?: string;             // Gap between blocks class
  background_color?: string;     // Background color class
}

/**
 * Course info
 */
export interface CourseInfo {
  id: number;                    // Course ID
  title: string;                 // Course title
  status: string;                // Course status: 'DRAFT', 'PUBLISHED', etc.
}

/**
 * Change record for tracking pending changes
 */
export interface ChangeRecord {
  type: 'create' | 'update' | 'delete';
  entityType: 'section' | 'lesson' | 'lessonContent';
  entityId: string;              // Entity ID (can be temp ID)
  data: any;                     // Entity data or update payload
  timestamp: number;             // When the change was made
}

/**
 * Pending changes grouped by entity type
 */
export interface PendingChanges {
  sections: {
    created: Section[];          // New sections to POST
    updated: Section[];          // Modified sections to PUT
    deleted: string[];           // Section IDs to DELETE
  };
  lessons: {
    created: Lesson[];           // New lessons to POST
    updated: Lesson[];           // Modified lessons to PUT
    deleted: string[];           // Lesson IDs to DELETE
  };
  lessonContent: {
    modified: Map<string, LessonContent>;  // Lesson ID -> modified content
  };
}

/**
 * Main course data state (normalized structure)
 * 
 * This is the single source of truth for all course data in Lesson Builder.
 */
export interface CourseDataState {
  // Course info
  courseInfo: CourseInfo;

  // Sections (flat array for easy iteration)
  sections: Section[];

  // Lessons grouped by section (for O(1) lookup)
  lessonsBySection: Map<string, Lesson[]>;

  // Lesson content cache (lazy-loaded)
  // KEY: lesson ID, VALUE: lesson content
  // This is the SINGLE SOURCE OF TRUTH for lesson content
  lessonContentCache: Map<string, LessonContent>;

  // Active lesson ID (currently selected)
  activeLessonId: string | null;

  // Pending changes (for batch save)
  pendingChanges: PendingChanges;

  // Temporary ID to real ID mapping
  // Used to replace temp IDs after successful save
  tempIdToRealId: Map<string, string>;
}

/**
 * Helper type for save request tracking (prevent race conditions)
 */
export interface SaveRequest {
  requestId: string;             // Unique request ID
  timestamp: number;             // When the request was initiated
  status: 'pending' | 'success' | 'error';
}

/**
 * Return type for useCourseDataManager hook
 */
export interface UseCourseDataManagerReturn {
  // State
  courseData: CourseDataState;
  isDirty: boolean;
  isSaving: boolean;
  error: string | null;
  isLoading: boolean;

  // Section Actions
  addSection: () => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (newOrder: string[]) => void;

  // Lesson Actions
  addLesson: (sectionId: string) => void;
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void;
  deleteLesson: (lessonId: string) => void;
  selectLesson: (lessonId: string, forceRefresh?: boolean) => Promise<void>;

  // Block Actions
  updateBlocks: (blocks: LessonBlock[]) => void;
  addBlock: (slotId: string, blockType: string, orderIndex: number) => void;
  deleteBlock: (blockId: number) => void;
  updateBlock: (blockId: number, updates: Partial<LessonBlock>) => void;

  // Save Actions
  saveAll: () => Promise<void>;
  handleManualSave: () => Promise<void>;

  // Utility
  refetch: () => Promise<void>;

  // Computed values
  activeLessonContent: LessonContent | null;  // Computed from lessonContentCache
}

/**
 * Helper function to generate temporary ID
 */
export const generateTempId = (): string => {
  return `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Helper function to check if ID is temporary
 */
export const isTempId = (id: string): boolean => {
  return id.startsWith('temp-');
};

/**
 * Helper function to create empty pending changes
 */
export const createEmptyPendingChanges = (): PendingChanges => ({
  sections: { created: [], updated: [], deleted: [] },
  lessons: { created: [], updated: [], deleted: [] },
  lessonContent: { modified: new Map() }
});
