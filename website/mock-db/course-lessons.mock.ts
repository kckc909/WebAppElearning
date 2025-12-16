/**
 * MOCK DB - course_lessons
 */

export interface CourseLesson {
    id: number;
    section_id: number;
    title: string;
    order_index: number;
    layout: number | null;
}

export const COURSE_LESSONS: CourseLesson[] = [
    // Section 1
    { id: 1, section_id: 1, title: 'Chào mừng đến với khóa học', order_index: 1, layout: 1 },
    { id: 2, section_id: 1, title: 'ReactJS là gì? Tại sao nên học?', order_index: 2, layout: 1 },
    { id: 3, section_id: 1, title: 'Cài đặt Node.js và VS Code', order_index: 3, layout: 1 },
    { id: 4, section_id: 1, title: 'Tạo dự án React đầu tiên', order_index: 4, layout: 1 },
    // Section 2
    { id: 5, section_id: 2, title: 'JSX là gì?', order_index: 1, layout: 1 },
    { id: 6, section_id: 2, title: 'Functional Components', order_index: 2, layout: 1 },
    { id: 7, section_id: 2, title: 'Class Components (Legacy)', order_index: 3, layout: 1 },
    { id: 8, section_id: 2, title: 'Bài tập thực hành', order_index: 4, layout: 2 },
];
