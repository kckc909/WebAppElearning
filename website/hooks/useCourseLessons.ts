import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface CourseLesson {
    id: number;
    course_id: number;
    section_id: number;
    section_title: string;
    title: string;
    description: string;
    duration: number;
    order_index: number;
    is_preview: boolean;
    is_completed: boolean;
    progress: number;
    last_accessed?: string;
}

export const useCourseLessons = (courseId: number, studentId?: number) => {
    const api = getApiInstance();

    return useQuery<CourseLesson[]>({
        queryKey: ['course-lessons', courseId, studentId],
        queryFn: async () => {
            const lessons = await api.courses.getCourseLessons(courseId);
            
            // If studentId provided, get progress data
            if (studentId) {
                const progress = await api.enrollments.getLessonProgress(courseId, studentId);
                
                // Merge progress data with lessons
                return lessons.map((lesson: any) => {
                    const lessonProgress = progress.find((p: any) => p.lesson_id === lesson.id);
                    return {
                        ...lesson,
                        is_completed: lessonProgress?.is_completed || false,
                        progress: lessonProgress?.progress || 0,
                        last_accessed: lessonProgress?.last_accessed,
                    };
                });
            }
            
            return lessons;
        },
        enabled: !!courseId,
    });
};
