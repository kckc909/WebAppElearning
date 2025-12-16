/**
 * MOCK DB - course_sections
 */

export interface CourseSection {
    id: number;
    course_id: number;
    title: string;
    order_index: number;
}

export const COURSE_SECTIONS: CourseSection[] = [
    // Course 1 - ReactJS
    { id: 1, course_id: 1, title: 'Giới thiệu & Cài đặt', order_index: 1 },
    { id: 2, course_id: 1, title: 'React Cơ Bản - JSX & Components', order_index: 2 },
    { id: 3, course_id: 1, title: 'State & Props', order_index: 3 },
    { id: 4, course_id: 1, title: 'React Hooks', order_index: 4 },
    { id: 5, course_id: 1, title: 'React Router', order_index: 5 },
    // Course 2 - Python
    { id: 6, course_id: 2, title: 'Python Basics', order_index: 1 },
    { id: 7, course_id: 2, title: 'Data Structures', order_index: 2 },
    { id: 8, course_id: 2, title: 'Functions & OOP', order_index: 3 },
];
