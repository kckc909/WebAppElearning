/**
 * MOCK DB - Course Q&A
 * Questions and answers for courses
 */

export interface CourseQuestion {
    id: number;
    course_id: number;
    user_id: number;
    question: string;
    asked_by: string;
    answers_count: number;
    likes_count: number;
    created_at: string;
}

export const COURSE_QUESTIONS: CourseQuestion[] = [
    {
        id: 1,
        course_id: 1,
        user_id: 8,
        question: 'Làm thế nào để sử dụng useEffect hook?',
        asked_by: 'Võ Thị Hương',
        answers_count: 3,
        likes_count: 5,
        created_at: '2024-12-10'
    },
    {
        id: 2,
        course_id: 1,
        user_id: 9,
        question: 'Sự khác biệt giữa props và state?',
        asked_by: 'Đặng Văn Tùng',
        answers_count: 2,
        likes_count: 3,
        created_at: '2024-12-08'
    },
    {
        id: 3,
        course_id: 1,
        user_id: 10,
        question: 'Khi nào nên dùng useMemo và useCallback?',
        asked_by: 'Bùi Thị Mai',
        answers_count: 5,
        likes_count: 12,
        created_at: '2024-12-05'
    },
    {
        id: 4,
        course_id: 2,
        user_id: 7,
        question: 'Python có thể dùng làm backend được không?',
        asked_by: 'Chu Đức Minh',
        answers_count: 8,
        likes_count: 15,
        created_at: '2024-11-20'
    },
];

// Helper to get questions by course
export const getQuestionsByCourse = (courseId: number): CourseQuestion[] => {
    return COURSE_QUESTIONS.filter(q => q.course_id === courseId);
};
