/**
 * MOCK DB - Student Homework
 * Homework assignments for class students
 */

export type HomeworkStatus = 'pending' | 'submitted' | 'graded' | 'overdue';

export interface StudentHomework {
    id: number;
    class_id: number;
    user_id: number;
    title: string;
    class_name: string;
    deadline: string;
    status: HomeworkStatus;
    grade?: string;
    submitted_at?: string;
}

export const STUDENT_HOMEWORK: StudentHomework[] = [
    {
        id: 1,
        class_id: 1,
        user_id: 7,
        title: 'Bài tập tuần 6: React Hooks',
        class_name: 'Web Development - Lớp A1',
        deadline: '2024-12-20',
        status: 'pending',
    },
    {
        id: 2,
        class_id: 1,
        user_id: 7,
        title: 'Bài tập tuần 5: State Management',
        class_name: 'Web Development - Lớp A1',
        deadline: '2024-12-13',
        status: 'submitted',
        submitted_at: '2024-12-12',
    },
    {
        id: 3,
        class_id: 1,
        user_id: 7,
        title: 'Bài tập tuần 4: Component Lifecycle',
        class_name: 'Web Development - Lớp A1',
        deadline: '2024-12-06',
        status: 'graded',
        grade: 'A',
        submitted_at: '2024-12-05',
    },
    {
        id: 4,
        class_id: 2,
        user_id: 7,
        title: 'Bài tập Python: Data Analysis',
        class_name: 'Data Science - Lớp B2',
        deadline: '2024-12-18',
        status: 'pending',
    },
];

// Helper to get homework by user
export const getHomeworkByUser = (userId: number): StudentHomework[] => {
    return STUDENT_HOMEWORK.filter(h => h.user_id === userId);
};
