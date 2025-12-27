import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { CourseDataState, Section, generateTempId } from './types';

interface UseSectionOperationsProps {
  courseData: CourseDataState;
  setCourseData: React.Dispatch<React.SetStateAction<CourseDataState>>;
  markDirty: () => void;
}

export function useSectionOperations({
  courseData,
  setCourseData,
  markDirty,
}: UseSectionOperationsProps) {
  /**
   * Add a new section (optimistic update, save on Save Draft)
   */
  const addSection = useCallback(async () => {
    const tempId = generateTempId();
    const newSection: Section = {
      id: tempId,
      title: 'Chương mới',
      order_index: courseData.sections.length,
      lessons: [],
      _isNew: true,
    };

    setCourseData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
      lessonsBySection: new Map(prev.lessonsBySection).set(tempId, []),
      pendingChanges: {
        ...prev.pendingChanges,
        sections: {
          ...prev.pendingChanges.sections,
          created: [...prev.pendingChanges.sections.created, newSection],
        },
      },
    }));

    markDirty();
    toast.success('Đã tạo chương mới (chưa lưu)');
  }, [courseData.sections.length, setCourseData, markDirty]);

  /**
   * Update a section (optimistic update, save on Save Draft)
   */
  const updateSection = useCallback(async (sectionId: string, updates: Partial<Section>) => {
    console.log('[updateSection] Called with:', { sectionId, updates });

    setCourseData(prev => {
      const sections = prev.sections.map(s =>
        s.id === sectionId
          ? { ...s, ...updates, _isModified: true }
          : s
      );

      const section = sections.find(s => s.id === sectionId);
      const pendingChanges = { ...prev.pendingChanges };

      if (section && !section._isNew && !pendingChanges.sections.updated.find(s => s.id === sectionId)) {
        pendingChanges.sections.updated.push(section);
      } else if (section && !section._isNew) {
        const index = pendingChanges.sections.updated.findIndex(s => s.id === sectionId);
        if (index !== -1) {
          pendingChanges.sections.updated[index] = section;
        }
      }

      console.log('[updateSection] Updated section:', section);

      return {
        ...prev,
        sections,
        pendingChanges,
      };
    });

    markDirty();
  }, [setCourseData, markDirty]);

  /**
   * Delete a section (optimistic update, save on Save Draft)
   */
  const deleteSection = useCallback(async (sectionId: string) => {
    setCourseData(prev => {
      const section = prev.sections.find(s => s.id === sectionId);
      const lessonsToDelete = section?.lessons || [];

      const sections = prev.sections.filter(s => s.id !== sectionId);
      const lessonsBySection = new Map(prev.lessonsBySection);
      lessonsBySection.delete(sectionId);

      const pendingChanges = { ...prev.pendingChanges };

      if (prev.sections.find(s => s.id === sectionId)?._isNew) {
        pendingChanges.sections.created = pendingChanges.sections.created.filter(s => s.id !== sectionId);
      } else {
        pendingChanges.sections.deleted.push(sectionId);
      }

      for (const lesson of lessonsToDelete) {
        if (lesson._isNew) {
          pendingChanges.lessons.created = pendingChanges.lessons.created.filter(l => l.id !== lesson.id);
        } else {
          if (!pendingChanges.lessons.deleted.includes(lesson.id)) {
            pendingChanges.lessons.deleted.push(lesson.id);
          }
        }
      }

      return {
        ...prev,
        sections,
        lessonsBySection,
        pendingChanges,
      };
    });

    markDirty();
    toast.success('Đã xóa chương (chưa lưu)', {
      icon: '🗑️',
      duration: 2000
    });
  }, [setCourseData, markDirty]);

  /**
   * Reorder sections
   */
  const reorderSections = useCallback((newOrder: string[]) => {
    setCourseData(prev => {
      const sections = newOrder.map((id, index) => {
        const section = prev.sections.find(s => s.id === id);
        if (!section) return null;
        return { ...section, order_index: index, _isModified: true };
      }).filter(Boolean) as Section[];

      return {
        ...prev,
        sections,
        pendingChanges: {
          ...prev.pendingChanges,
          sections: {
            ...prev.pendingChanges.sections,
            updated: sections.filter(s => !s._isNew),
          },
        },
      };
    });

    markDirty();
  }, [setCourseData, markDirty]);

  return {
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
  };
}
