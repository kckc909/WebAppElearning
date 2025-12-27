import { useQuery } from '@tanstack/react-query';
import { getApiInstance } from '../API';

export interface ClassHomework {
    id: number;
    class_id: number;
    title: string;
    description: string;
    due_date: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number;
    submitted_at?: string;
    file_url?: string;
}

export const useClassHomework = (classId: number) => {
    const api = getApiInstance();

    return useQuery<ClassHomework[]>({
        queryKey: ['class-homework', classId],
        queryFn: async () => {
            const assignments = await api.assignments.getAssignmentsByClass(classId);
            return assignments;
        },
        enabled: !!classId,
    });
};
