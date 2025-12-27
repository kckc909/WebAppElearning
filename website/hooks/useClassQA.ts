import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface ClassQuestion {
    id: number;
    class_id: number;
    user_id: number;
    user_name: string;
    avatar: string;
    question: string;
    created_at: string;
    answers: ClassAnswer[];
}

export interface ClassAnswer {
    id: number;
    question_id: number;
    user_id: number;
    user_name: string;
    avatar: string;
    answer: string;
    created_at: string;
    is_instructor: boolean;
}

export const useClassQA = (classId: number) => {
    const api = getApiInstance();

    return useQuery<ClassQuestion[]>({
        queryKey: ['class-qa', classId],
        queryFn: async () => {
            // Using course Q&A API for class discussions
            const questions = await api.courses.getCourseQuestions(classId);
            return questions;
        },
        enabled: !!classId,
    });
};
