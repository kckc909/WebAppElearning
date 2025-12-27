import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { CourseDataState, Lesson, LessonContent, generateTempId, isTempId, API_BASE_URL } from './types';

interface UseLessonOperationsProps {
  courseData: CourseDataState;
  setCourseData: React.Dispatch<React.SetStateAction<CourseDataState>>;
  markDirty: () => void;
}

export function useLessonOperations({
  courseData,
  setCourseData,
  markDirty,
}: UseLessonOperationsProps) {
  /**
   * Add a new lesson (optimistic update, save on Save Draft)
   */
  const addLesson = useCallback(async (sectionId: string): Promise<string | null> => {
    const section = courseData.sections.find(s => s.id === sectionId);
    if (!section) {
      toast.error('Section not found');
      return null;
    }

    const tempId = generateTempId();
    const newLesson: Lesson = {
      id: tempId,
      section_id: sectionId,
      title: '',
      order_index: section.lessons.length,
      layout: 'single',
      _isNew: true,
    };

    setCourseData(prev => {
      const sections = prev.sections.map(s =>
        s.id === sectionId
          ? { ...s, lessons: [...s.lessons, newLesson] }
          : s
      );

      const lessonsBySection = new Map(prev.lessonsBySection);
      lessonsBySection.set(sectionId, [...(lessonsBySection.get(sectionId) || []), newLesson]);

      return {
        ...prev,
        sections,
        lessonsBySection,
        pendingChanges: {
          ...prev.pendingChanges,
          lessons: {
            ...prev.pendingChanges.lessons,
            created: [...prev.pendingChanges.lessons.created, newLesson],
          },
        },
      };
    });

    markDirty();
    toast.success('Đã tạo bài học mới (chưa lưu)');

    return tempId;
  }, [courseData.sections, setCourseData, markDirty]);

  /**
   * Update a lesson (optimistic update, save on Save Draft for structure changes)
   */
  const updateLesson = useCallback(async (lessonId: string, updates: Partial<Lesson>) => {
    console.log('[useCourseDataManager] updateLesson called:', { lessonId, updates });

    setCourseData(prev => {
      const sections = prev.sections.map(s => ({
        ...s,
        lessons: s.lessons.map(l =>
          l.id === lessonId
            ? { ...l, ...updates, _isModified: true }
            : l
        ),
      }));

      const lessonsBySection = new Map<string, Lesson[]>();
      sections.forEach(s => {
        lessonsBySection.set(s.id, s.lessons);
      });

      const lesson = sections.flatMap(s => s.lessons).find(l => l.id === lessonId);
      const pendingChanges = { ...prev.pendingChanges };

      if (lesson && !lesson._isNew && !pendingChanges.lessons.updated.find(l => l.id === lessonId)) {
        pendingChanges.lessons.updated.push(lesson);
      }

      console.log('[useCourseDataManager] Optimistic update applied, new sections:', sections);

      return {
        ...prev,
        sections,
        lessonsBySection,
        pendingChanges,
      };
    });

    markDirty();

    // For title or description changes, save immediately for better UX
    if ((updates.title !== undefined || updates.description !== undefined) && !isTempId(lessonId)) {
      try {
        const payload: any = { id: parseInt(lessonId) };

        if (updates.title !== undefined) {
          payload.title = updates.title;
          console.log('[useCourseDataManager] Saving title immediately:', `${API_BASE_URL}/lessons/${lessonId}`);
        }

        if (updates.description !== undefined) {
          payload.description = updates.description;
          console.log('[useCourseDataManager] Saving description immediately:', `${API_BASE_URL}/lessons/${lessonId}`);
        }

        const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[useCourseDataManager] API error:', errorText);
          throw new Error(`Failed to update lesson: ${errorText}`);
        }

        const result = await response.json();
        console.log('[useCourseDataManager] Lesson saved successfully:', result);

        setCourseData(prev => ({
          ...prev,
          pendingChanges: {
            ...prev.pendingChanges,
            lessons: {
              ...prev.pendingChanges.lessons,
              updated: prev.pendingChanges.lessons.updated.filter(l => l.id !== lessonId),
            },
          },
        }));
      } catch (err: any) {
        console.error('[useCourseDataManager] Failed to save lesson:', err);
        toast.error('Không thể lưu thay đổi');
      }
    }
  }, [setCourseData, markDirty]);

  /**
   * Delete a lesson (optimistic update)
   */
  const deleteLesson = useCallback((lessonId: string) => {
    setCourseData(prev => {
      const sections = prev.sections.map(s => ({
        ...s,
        lessons: s.lessons.filter(l => l.id !== lessonId),
      }));

      const lessonsBySection = new Map<string, Lesson[]>();
      sections.forEach(s => {
        lessonsBySection.set(s.id, s.lessons);
      });

      const pendingChanges = { ...prev.pendingChanges };
      const lesson = prev.sections.flatMap(s => s.lessons).find(l => l.id === lessonId);

      if (lesson?._isNew) {
        pendingChanges.lessons.created = pendingChanges.lessons.created.filter(l => l.id !== lessonId);
      } else {
        pendingChanges.lessons.deleted.push(lessonId);
      }

      const activeLessonId = prev.activeLessonId === lessonId ? null : prev.activeLessonId;

      return {
        ...prev,
        sections,
        lessonsBySection,
        pendingChanges,
        activeLessonId,
      };
    });

    markDirty();
    toast.success('Đã xóa bài học (chưa lưu)', {
      icon: '🗑️',
      duration: 2000
    });
  }, [setCourseData, markDirty]);

  /**
   * Select a lesson (lazy-load content if not cached)
   */
  const selectLesson = useCallback(async (lessonId: string, forceRefresh: boolean = false) => {
    console.log('[useCourseDataManager] selectLesson called:', lessonId, 'forceRefresh:', forceRefresh);

    if (!forceRefresh && courseData.lessonContentCache.has(lessonId)) {
      console.log('[useCourseDataManager] Content found in cache, using cached version');
      setCourseData(prev => ({ ...prev, activeLessonId: lessonId }));
      return;
    }

    if (isTempId(lessonId)) {
      console.log('[useCourseDataManager] Temp ID detected, creating empty content');
      const emptyContent: LessonContent = {
        versionId: 0,
        layoutType: 'single',
        blocks: [],
        metadata: {},
      };

      setCourseData(prev => {
        const lessonContentCache = new Map(prev.lessonContentCache);
        lessonContentCache.set(lessonId, emptyContent);
        return {
          ...prev,
          activeLessonId: lessonId,
          lessonContentCache,
        };
      });
      return;
    }

    try {
      console.log('[useCourseDataManager] Fetching lesson content from API:', lessonId);
      const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
      if (!response.ok) throw new Error('Failed to fetch lesson content');

      const responseData = await response.json();
      console.log('[useCourseDataManager] Raw API response:', responseData);

      const lessonData = responseData.data || responseData;
      const lessonVersion = lessonData.lesson_versions?.[0] || lessonData.lesson_version;

      const content: LessonContent = {
        versionId: lessonVersion?.id || 0,
        layoutType: lessonVersion?.layout_type || 'single',
        blocks: lessonVersion?.lesson_blocks || lessonData.blocks || [],
        metadata: lessonVersion?.metadata || {},
      };

      console.log('[useCourseDataManager] Parsed lesson content:', content);

      setCourseData(prev => {
        const lessonContentCache = new Map(prev.lessonContentCache);
        lessonContentCache.set(lessonId, content);
        return {
          ...prev,
          activeLessonId: lessonId,
          lessonContentCache,
        };
      });
    } catch (err: any) {
      toast.error('Failed to load lesson content');
      console.error('[useCourseDataManager] Error loading lesson content:', err);
    }
  }, [courseData.lessonContentCache, setCourseData]);

  return {
    addLesson,
    updateLesson,
    deleteLesson,
    selectLesson,
  };
}
