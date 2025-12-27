/**
 * MOCK DB - Student Lesson Progress
 * Lesson progress and status for enrolled students
 */

export interface StudentLessonProgress {
    id: number;
    user_id: number;
    lesson_id: number;
    title: string;
    duration: string;
    completed: boolean;
    locked: boolean;
    progress_percent: number;
    last_watched_at?: string;
}

export const STUDENT_LESSON_PROGRESS: StudentLessonProgress[] = [
    // User 7 - Course 1 (React)
    { id: 1, user_id: 7, lesson_id: 1, title: 'Introduction to React', duration: '5:30', completed: true, locked: false, progress_percent: 100, last_watched_at: '2024-12-01' },
    { id: 2, user_id: 7, lesson_id: 2, title: 'JSX Basics', duration: '8:45', completed: true, locked: false, progress_percent: 100, last_watched_at: '2024-12-02' },
    { id: 3, user_id: 7, lesson_id: 3, title: 'Components', duration: '12:20', completed: false, locked: false, progress_percent: 65, last_watched_at: '2024-12-05' },
    { id: 4, user_id: 7, lesson_id: 4, title: 'Props & State', duration: '15:30', completed: false, locked: true, progress_percent: 0 },
    { id: 5, user_id: 7, lesson_id: 5, title: 'Hooks Introduction', duration: '18:00', completed: false, locked: true, progress_percent: 0 },
    { id: 6, user_id: 7, lesson_id: 6, title: 'useState & useEffect', duration: '22:15', completed: false, locked: true, progress_percent: 0 },

    // User 7 - Course 2 (Python)
    { id: 7, user_id: 7, lesson_id: 101, title: 'Python Introduction', duration: '6:00', completed: true, locked: false, progress_percent: 100 },
    { id: 8, user_id: 7, lesson_id: 102, title: 'Variables & Data Types', duration: '12:30', completed: true, locked: false, progress_percent: 100 },
    { id: 9, user_id: 7, lesson_id: 103, title: 'Control Flow', duration: '15:45', completed: false, locked: false, progress_percent: 30 },

    // User 8 - Course 1
    { id: 10, user_id: 8, lesson_id: 1, title: 'Introduction to React', duration: '5:30', completed: true, locked: false, progress_percent: 100 },
    { id: 11, user_id: 8, lesson_id: 2, title: 'JSX Basics', duration: '8:45', completed: false, locked: false, progress_percent: 50 },
];

// Helper to get lesson progress by user
export const getLessonProgressByUser = (userId: number): StudentLessonProgress[] => {
    return STUDENT_LESSON_PROGRESS.filter(p => p.user_id === userId);
};

// Helper to get lesson progress by user and course
export const getLessonProgressByCourse = (userId: number, lessonIds: number[]): StudentLessonProgress[] => {
    return STUDENT_LESSON_PROGRESS.filter(p => p.user_id === userId && lessonIds.includes(p.lesson_id));
};
