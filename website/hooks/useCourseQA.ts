import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface CourseQuestion {
    id: number;
    course_id: number;
    lesson_id?: number;
    user_id: number;
    user_name: string;
    user_avatar: string;
    question: string;
    created_at: string;
    answers: CourseAnswer[];
    is_resolved: boolean;
}

export interface CourseAnswer {
    id: number;
    question_id: number;
    user_id: number;
    user_name: string;
    user_avatar: string;
    answer: string;
    created_at: string;
    is_instructor: boolean;
    is_accepted: boolean;
}

export const useCourseQA = (courseId: number, lessonId?: number) => {
    const api = getApiInstance();

    return useQuery<CourseQuestion[]>({
        queryKey: ['course-qa', courseId, lessonId],
        queryFn: async () => {
            const questions = await api.courses.getCourseQuestions(courseId);
            
            // Filter by lesson if provided
            if (lessonId) {
                return questions.filter((q: any) => q.lesson_id === lessonId);
            }
            
            return questions;
        },
        enabled: !!courseId,
    });
};
