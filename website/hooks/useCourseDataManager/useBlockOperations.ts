import { useCallback } from 'react';
import { CourseDataState, LessonBlock } from './types';

interface UseBlockOperationsProps {
  courseData: CourseDataState;
  setCourseData: React.Dispatch<React.SetStateAction<CourseDataState>>;
  markDirty: () => void;
}

export function useBlockOperations({
  courseData,
  setCourseData,
  markDirty,
}: UseBlockOperationsProps) {
  /**
   * Update blocks for active lesson
   */
  const updateBlocks = useCallback((blocks: LessonBlock[]) => {
    if (!courseData.activeLessonId) return;

    setCourseData(prev => {
      const lessonContentCache = new Map(prev.lessonContentCache);
      const content = lessonContentCache.get(prev.activeLessonId!);
      if (!content) return prev;

      lessonContentCache.set(prev.activeLessonId!, {
        ...content,
        blocks,
        _isModified: true,
      });

      const pendingChanges = { ...prev.pendingChanges };
      pendingChanges.lessonContent.modified.set(prev.activeLessonId!, {
        ...content,
        blocks,
        _isModified: true,
      });

      return {
        ...prev,
        lessonContentCache,
        pendingChanges,
      };
    });

    markDirty();
  }, [courseData.activeLessonId, setCourseData, markDirty]);

  /**
   * Add a block (placeholder - will be implemented with full block management)
   */
  const addBlock = useCallback((slotId: string, blockType: string, orderIndex: number) => {
    console.log('addBlock', slotId, blockType, orderIndex);
  }, []);

  /**
   * Delete a block (placeholder)
   */
  const deleteBlock = useCallback((blockId: number) => {
    console.log('deleteBlock', blockId);
  }, []);

  /**
   * Update a block (placeholder)
   */
  const updateBlock = useCallback((blockId: number, updates: Partial<LessonBlock>) => {
    console.log('updateBlock', blockId, updates);
  }, []);

  return {
    updateBlocks,
    addBlock,
    deleteBlock,
    updateBlock,
  };
}
