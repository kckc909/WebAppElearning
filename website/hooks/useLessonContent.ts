import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface LessonBlock {
    id: number;
    type: string;
    slot_id: string;
    order_index: number;
    content: any;
    settings: any;
}

export interface LessonAsset {
    id: number;
    type: 'image' | 'video' | 'pdf' | 'document' | 'audio';
    filename: string;
    url: string;
    preview_url?: string;
    file_size: number;
}

export interface LessonContent {
    id: number;
    title: string;
    section_id?: number;
    duration?: number;
    is_preview?: boolean;
    layout_type: string;
    layout?: any;
    metadata?: any;
    blocks: LessonBlock[];
    assets?: LessonAsset[];
    next_lesson_id?: number;
    prev_lesson_id?: number;
}

export const useLessonContent = (lessonId: number, studentId?: number) => {
    const api = getApiInstance();

    return useQuery<LessonContent>({
        queryKey: ['lesson-content', lessonId, studentId],
        queryFn: async () => {
            const lesson = await api.lessons.getLessonById(lessonId);

            // Track lesson view if studentId provided
            if (studentId) {
                await api.lessons.trackLessonView(lessonId, studentId);
            }

            return lesson as LessonContent;
        },
        enabled: !!lessonId && lessonId > 0,
    });
};
