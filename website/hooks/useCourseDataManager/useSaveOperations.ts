import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { CourseDataState, generateTempId, isTempId, createEmptyPendingChanges, API_BASE_URL } from './types';

interface UseSaveOperationsProps {
  courseData: CourseDataState;
  setCourseData: React.Dispatch<React.SetStateAction<CourseDataState>>;
  isDirty: boolean;
  markClean: () => void;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useSaveOperations({
  courseData,
  setCourseData,
  isDirty,
  markClean,
  setIsSaving,
  setError,
}: UseSaveOperationsProps) {
  const currentSaveRequestId = useRef<string | null>(null);

  /**
   * Save sections (create, update, delete)
   */
  const saveSections = useCallback(async (): Promise<Map<string, string>> => {
    const { created, updated, deleted } = courseData.pendingChanges.sections;
    const idMap = new Map<string, string>();

    console.log('[saveSections] Pending changes:', {
      created: created.length,
      updated: updated.length,
      deleted: deleted.length
    });

    // 1. Delete sections
    for (const sectionId of deleted) {
      if (isTempId(sectionId)) continue;

      console.log('[saveSections] Deleting section:', sectionId);

      const response = await fetch(`${API_BASE_URL}/course-sections/${sectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        const isNotFoundError = errorText.includes('No record was found') ||
          errorText.includes('Record to delete does not exist') ||
          response.status === 404;

        if (isNotFoundError) {
          console.warn('[saveSections] Section already deleted:', sectionId);
          continue;
        }

        console.error('[saveSections] Delete failed:', {
          sectionId,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to delete section ${sectionId}: ${response.status} ${errorText}`);
      }

      console.log('[saveSections] Section deleted successfully:', sectionId);
    }

    // 2. Create new sections
    for (const section of created) {
      const courseIdNum = typeof courseData.courseInfo.id === 'number'
        ? courseData.courseInfo.id
        : parseInt(courseData.courseInfo.id?.toString() || '0');

      if (!courseIdNum || isNaN(courseIdNum)) {
        throw new Error('Invalid course_id: ' + courseData.courseInfo.id);
      }

      const payload = {
        course_id: courseIdNum,
        title: section.title,
        order_index: section.order_index,
      };

      console.log('[saveSections] Creating section:', payload);

      const response = await fetch(`${API_BASE_URL}/course-sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[saveSections] Create failed:', {
          section: section.title,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to create section: ${section.title} - ${response.status} ${errorText}`);
      }

      const createdSection = await response.json();
      console.log('[saveSections] Section created successfully:', createdSection);
      idMap.set(section.id, createdSection.id.toString());
    }

    // 3. Update existing sections
    for (const section of updated) {
      if (isTempId(section.id)) continue;

      const payload = {
        title: section.title,
        order_index: section.order_index,
      };

      console.log('[saveSections] Updating section:', section.id, payload);

      const response = await fetch(`${API_BASE_URL}/course-sections/${section.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[saveSections] Update failed:', {
          sectionId: section.id,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to update section ${section.id}: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('[saveSections] Section updated successfully:', result);
    }

    return idMap;
  }, [courseData]);

  /**
   * Save lessons (create, update, delete)
   */
  const saveLessons = useCallback(async (sectionIdMap: Map<string, string>): Promise<Map<string, string>> => {
    const { created, updated, deleted } = courseData.pendingChanges.lessons;
    const idMap = new Map<string, string>();

    console.log('[saveLessons] Pending changes:', {
      created: created.length,
      updated: updated.length,
      deleted: deleted.length
    });

    // 1. Delete lessons
    for (const lessonId of deleted) {
      if (isTempId(lessonId)) continue;

      console.log('[saveLessons] Deleting lesson:', lessonId);

      const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        const isNotFoundError = errorText.includes('No record was found') ||
          errorText.includes('Record to delete does not exist') ||
          response.status === 404;

        if (isNotFoundError) {
          console.warn('[saveLessons] Lesson already deleted:', lessonId);
          continue;
        }

        console.error('[saveLessons] Delete failed:', {
          lessonId,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to delete lesson ${lessonId}: ${response.status} ${errorText}`);
      }

      console.log('[saveLessons] Lesson deleted successfully:', lessonId);
    }

    // 2. Create new lessons
    for (const lesson of created) {
      const sectionId = sectionIdMap.get(lesson.section_id) || lesson.section_id;

      const courseIdNum = typeof courseData.courseInfo.id === 'number'
        ? courseData.courseInfo.id
        : parseInt(courseData.courseInfo.id?.toString() || '0');

      if (!courseIdNum || isNaN(courseIdNum)) {
        throw new Error('Invalid course_id: ' + courseData.courseInfo.id);
      }

      const sectionIdNum = parseInt(sectionId);
      if (!sectionIdNum || isNaN(sectionIdNum)) {
        throw new Error(`Invalid section_id for lesson "${lesson.title}": ${sectionId}`);
      }

      const payload = {
        course_id: courseIdNum,
        section_id: sectionIdNum,
        title: lesson.title || ' ',
        description: lesson.description,
        order_index: lesson.order_index,
      };

      console.log('[saveLessons] Creating lesson:', payload);

      const response = await fetch(`${API_BASE_URL}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[saveLessons] Create failed:', {
          lesson: lesson.title,
          payload,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to create lesson "${lesson.title}": ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('[saveLessons] Lesson created successfully:', result);
      const createdLesson = result.data || result;
      idMap.set(lesson.id, createdLesson.id.toString());
    }

    // 3. Update existing lessons
    for (const lesson of updated) {
      if (isTempId(lesson.id)) continue;

      const sectionId = sectionIdMap.get(lesson.section_id) || lesson.section_id;

      const payload = {
        id: parseInt(lesson.id),
        section_id: parseInt(sectionId),
        title: lesson.title,
        description: lesson.description,
        order_index: lesson.order_index,
      };

      console.log('[saveLessons] Updating lesson:', lesson.id, payload);

      const response = await fetch(`${API_BASE_URL}/lessons/${lesson.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[saveLessons] Update failed:', {
          lessonId: lesson.id,
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Failed to update lesson ${lesson.id}: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('[saveLessons] Lesson updated successfully:', result);
    }

    return idMap;
  }, [courseData]);

  /**
   * Save lesson content (blocks and metadata)
   */
  const saveLessonContent = useCallback(async (lessonIdMap: Map<string, string>): Promise<void> => {
    const { modified } = courseData.pendingChanges.lessonContent;

    for (const [lessonId, content] of modified.entries()) {
      const realLessonId = lessonIdMap.get(lessonId) || lessonId;

      if (content.metadata) {
        const response = await fetch(`${API_BASE_URL}/lesson-versions/${content.versionId}/metadata`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content.metadata),
        });

        if (!response.ok) {
          throw new Error(`Failed to update metadata for lesson ${realLessonId}`);
        }
      }

      if (content.blocks && content._isModified) {
        console.log(`Lesson ${realLessonId} content marked as modified`);
      }
    }
  }, [courseData]);

  /**
   * Replace temporary IDs with real IDs after successful save
   */
  const replaceTempIds = useCallback((
    sectionIdMap: Map<string, string>,
    lessonIdMap: Map<string, string>
  ) => {
    setCourseData(prev => {
      const sections = [...prev.sections];
      const lessonsBySection = new Map(prev.lessonsBySection);
      const lessonContentCache = new Map(prev.lessonContentCache);
      const tempIdToRealId = new Map(prev.tempIdToRealId);

      for (const [tempId, realId] of sectionIdMap.entries()) {
        const sectionIndex = sections.findIndex(s => s.id === tempId);
        if (sectionIndex !== -1) {
          sections[sectionIndex] = {
            ...sections[sectionIndex],
            id: realId,
            _isNew: undefined,
            _isModified: undefined,
          };

          const lessons = lessonsBySection.get(tempId);
          if (lessons) {
            lessonsBySection.delete(tempId);
            lessonsBySection.set(realId, lessons.map(l => ({
              ...l,
              section_id: realId,
            })));
          }
        }

        tempIdToRealId.set(tempId, realId);
      }

      for (const [tempId, realId] of lessonIdMap.entries()) {
        for (let i = 0; i < sections.length; i++) {
          const lessonIndex = sections[i].lessons.findIndex(l => l.id === tempId);
          if (lessonIndex !== -1) {
            sections[i].lessons[lessonIndex] = {
              ...sections[i].lessons[lessonIndex],
              id: realId,
              _isNew: undefined,
              _isModified: undefined,
            };
          }
        }

        for (const [sectionId, lessons] of lessonsBySection.entries()) {
          const lessonIndex = lessons.findIndex(l => l.id === tempId);
          if (lessonIndex !== -1) {
            lessons[lessonIndex] = {
              ...lessons[lessonIndex],
              id: realId,
              _isNew: undefined,
              _isModified: undefined,
            };
          }
        }

        const content = lessonContentCache.get(tempId);
        if (content) {
          lessonContentCache.delete(tempId);
          lessonContentCache.set(realId, {
            ...content,
            _isModified: undefined,
          });
        }

        tempIdToRealId.set(tempId, realId);
      }

      return {
        ...prev,
        sections,
        lessonsBySection,
        lessonContentCache,
        tempIdToRealId,
      };
    });
  }, [setCourseData]);

  /**
   * Save all pending changes
   */
  const saveAll = useCallback(async () => {
    if (!isDirty) {
      toast('Không có thay đổi nào để lưu', { icon: 'ℹ️' });
      return;
    }

    const saveRequestId = generateTempId();
    currentSaveRequestId.current = saveRequestId;

    setIsSaving(true);
    setError(null);

    const snapshot = structuredClone(courseData);

    const { sections, lessons, lessonContent } = courseData.pendingChanges;
    const totalChanges =
      sections.created.length + sections.updated.length + sections.deleted.length +
      lessons.created.length + lessons.updated.length + lessons.deleted.length +
      lessonContent.modified.size;

    const changesSummary = {
      sectionsCreated: sections.created.length,
      sectionsUpdated: sections.updated.length,
      sectionsDeleted: sections.deleted.length,
      lessonsCreated: lessons.created.length,
      lessonsUpdated: lessons.updated.length,
      lessonsDeleted: lessons.deleted.length,
      contentModified: lessonContent.modified.size,
    };

    console.log('[saveAll] Starting save with', totalChanges, 'pending changes:', changesSummary);

    try {
      toast.loading('Đang lưu chương...', { id: 'save-progress' });
      const sectionIdMap = await saveSections();

      toast.loading('Đang lưu bài học...', { id: 'save-progress' });
      const lessonIdMap = await saveLessons(sectionIdMap);

      toast.loading('Đang lưu nội dung bài học...', { id: 'save-progress' });
      await saveLessonContent(lessonIdMap);

      if (currentSaveRequestId.current !== saveRequestId) {
        console.log('Stale save response, ignoring');
        toast.dismiss('save-progress');
        return;
      }

      replaceTempIds(sectionIdMap, lessonIdMap);

      setCourseData(prev => ({
        ...prev,
        pendingChanges: createEmptyPendingChanges(),
      }));

      markClean();

      toast.dismiss('save-progress');

      const details = [];
      if (changesSummary.sectionsCreated > 0) details.push(`${changesSummary.sectionsCreated} chương mới`);
      if (changesSummary.sectionsUpdated > 0) details.push(`${changesSummary.sectionsUpdated} chương cập nhật`);
      if (changesSummary.sectionsDeleted > 0) details.push(`${changesSummary.sectionsDeleted} chương xóa`);
      if (changesSummary.lessonsCreated > 0) details.push(`${changesSummary.lessonsCreated} bài học mới`);
      if (changesSummary.lessonsUpdated > 0) details.push(`${changesSummary.lessonsUpdated} bài học cập nhật`);
      if (changesSummary.lessonsDeleted > 0) details.push(`${changesSummary.lessonsDeleted} bài học xóa`);
      if (changesSummary.contentModified > 0) details.push(`${changesSummary.contentModified} nội dung cập nhật`);

      const message = details.length > 0
        ? `Đã lưu thành công: ${details.join(', ')}`
        : `Đã lưu thành công ${totalChanges} thay đổi`;

      toast.success(message, {
        icon: '✅',
        duration: 4000
      });

      console.log('[saveAll] Save completed successfully');
    } catch (err: any) {
      setCourseData(snapshot);
      setError(err.message);

      toast.dismiss('save-progress');
      toast.error(`Lưu thất bại: ${err.message}`, {
        duration: 5000,
        icon: '❌'
      });

      console.error('[saveAll] Save error:', err);
    } finally {
      setIsSaving(false);
    }
  }, [isDirty, courseData, markClean, saveSections, saveLessons, saveLessonContent, replaceTempIds, setCourseData, setIsSaving, setError]);

  /**
   * Manual save handler (for "Save Draft" button)
   */
  const handleManualSave = useCallback(async () => {
    if (!isDirty) {
      toast('Không có thay đổi nào để lưu', { icon: 'ℹ️' });
      return;
    }

    await saveAll();
  }, [isDirty, saveAll]);

  return {
    saveAll,
    handleManualSave,
  };
}
