/**
 * useCourseDataManager Hook
 * 
 * Manages unified course data state with optimistic updates and auto-save.
 * This is the single source of truth for all course data in Lesson Builder.
 * 
 * Features:
 * - Normalized state structure for O(1) lookups
 * - Optimistic updates with rollback on failure
 * - Auto-save with 60s debounce
 * - Lazy-loading of lesson content
 * - Temporary ID management
 * - Race condition prevention
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  CourseDataState,
  CourseInfo,
  Section,
  Lesson,
  LessonContent,
  UseCourseDataManagerReturn,
  createEmptyPendingChanges,
  API_BASE_URL,
} from './types';
import { useSectionOperations } from './useSectionOperations';
import { useLessonOperations } from './useLessonOperations';
import { useBlockOperations } from './useBlockOperations';
import { useSaveOperations } from './useSaveOperations';

export function useCourseDataManager(courseId: number): UseCourseDataManagerReturn {
  // ============================================================================
  // STATE
  // ============================================================================

  const [courseData, setCourseData] = useState<CourseDataState>({
    courseInfo: { id: courseId, title: '', status: 'DRAFT' },
    sections: [],
    lessonsBySection: new Map(),
    lessonContentCache: new Map(),
    activeLessonId: null,
    pendingChanges: createEmptyPendingChanges(),
    tempIdToRealId: new Map(),
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-save timer
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const activeLessonContent: LessonContent | null = courseData.activeLessonId
    ? courseData.lessonContentCache.get(courseData.activeLessonId) || null
    : null;

  // ============================================================================
  // DIRTY FLAG MANAGEMENT
  // ============================================================================

  const markDirty = useCallback(() => {
    setIsDirty(true);

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = setTimeout(() => {
      // Auto-save will be triggered by saveAll
    }, 60000);
  }, []);

  const markClean = useCallback(() => {
    setIsDirty(false);

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
  }, []);

  // ============================================================================
  // INITIAL DATA LOADING
  // ============================================================================

  const fetchCourseData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const courseResponse = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      if (!courseResponse.ok) throw new Error('Failed to fetch course');
      const courseInfoRaw = await courseResponse.json();

      const courseInfo: CourseInfo = {
        id: courseInfoRaw.id || courseInfoRaw.data?.id || courseId,
        title: courseInfoRaw.title || courseInfoRaw.data?.title || 'Course',
        status: courseInfoRaw.status || courseInfoRaw.data?.status || 'DRAFT',
      };

      console.log('[fetchCourseData] Course info loaded:', courseInfo);

      const sectionsResponse = await fetch(`${API_BASE_URL}/courses/${courseId}/sections`);
      if (!sectionsResponse.ok) throw new Error('Failed to fetch sections');
      const sectionsData = await sectionsResponse.json();

      const sectionsArray = Array.isArray(sectionsData) ? sectionsData : (sectionsData.data || []);

      const sections: Section[] = sectionsArray
        .map((s: any) => ({
          id: s.id.toString(),
          title: s.title,
          order_index: s.order_index,
          lessons: (s.course_lessons || s.lessons || [])
            .map((l: any) => ({
              id: l.id.toString(),
              section_id: s.id.toString(),
              title: l.title,
              description: l.description,
              order_index: l.order_index,
              layout: l.layout || 'single',
              duration: l.duration,
              status: l.status,
            }))
            .sort((a: Lesson, b: Lesson) => a.order_index - b.order_index),
        }))
        .sort((a: Section, b: Section) => a.order_index - b.order_index);

      const lessonsBySection = new Map<string, Lesson[]>();
      sections.forEach(section => {
        lessonsBySection.set(section.id, section.lessons);
      });

      setCourseData({
        courseInfo,
        sections,
        lessonsBySection,
        lessonContentCache: new Map(),
        activeLessonId: null,
        pendingChanges: createEmptyPendingChanges(),
        tempIdToRealId: new Map(),
      });

      setIsDirty(false);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load course data');
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  // ============================================================================
  // OPERATIONS HOOKS
  // ============================================================================

  const sectionOps = useSectionOperations({
    courseData,
    setCourseData,
    markDirty,
  });

  const lessonOps = useLessonOperations({
    courseData,
    setCourseData,
    markDirty,
  });

  const blockOps = useBlockOperations({
    courseData,
    setCourseData,
    markDirty,
  });

  const saveOps = useSaveOperations({
    courseData,
    setCourseData,
    isDirty,
    markClean,
    setIsSaving,
    setError,
  });

  // ============================================================================
  // CLEANUP
  // ============================================================================

  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // State
    courseData,
    isDirty,
    isSaving,
    error,
    isLoading,

    // Section Actions
    ...sectionOps,

    // Lesson Actions
    ...lessonOps,

    // Block Actions
    ...blockOps,

    // Save Actions
    ...saveOps,

    // Utility
    refetch: fetchCourseData,

    // Computed
    activeLessonContent,
  };
}
