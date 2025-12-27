/**
 * MOCK DB - course_sections
 * Complete mock data with full sections for 2 courses
 * Other courses have minimal sections
 */

export interface CourseSection {
    id: number;
    course_id: number;
    title: string;
    order_index: number;
}

export const COURSE_SECTIONS: CourseSection[] = [
    // =============================================
    // COURSE 1 - ReactJS (FULL - 5 Sections)
    // =============================================
    { id: 1, course_id: 1, title: 'Giới thiệu & Cài đặt', order_index: 1 },
    { id: 2, course_id: 1, title: 'React Cơ Bản - JSX & Components', order_index: 2 },
    { id: 3, course_id: 1, title: 'State & Props', order_index: 3 },
    { id: 4, course_id: 1, title: 'React Hooks', order_index: 4 },
    { id: 5, course_id: 1, title: 'React Router & Project', order_index: 5 },

    // =============================================
    // COURSE 2 - Python (FULL - 5 Sections)
    // =============================================
    { id: 6, course_id: 2, title: 'Giới thiệu Python', order_index: 1 },
    { id: 7, course_id: 2, title: 'Data Types & Variables', order_index: 2 },
    { id: 8, course_id: 2, title: 'Functions & OOP', order_index: 3 },
    { id: 9, course_id: 2, title: 'Libraries & Packages', order_index: 4 },
    { id: 10, course_id: 2, title: 'Final Project', order_index: 5 },

    // =============================================
    // OTHER COURSES - Minimal (1 Section each)
    // =============================================
    // Course 3 - NodeJS
    { id: 11, course_id: 3, title: 'Introduction to NodeJS', order_index: 1 },
    // Course 4 - Machine Learning
    { id: 12, course_id: 4, title: 'Introduction to ML', order_index: 1 },
    // Course 5 - Flutter
    { id: 13, course_id: 5, title: 'Getting Started with Flutter', order_index: 1 },
    // Course 6 - IELTS Speaking
    { id: 14, course_id: 6, title: 'Speaking Fundamentals', order_index: 1 },
    // Course 7 - TOEIC
    { id: 15, course_id: 7, title: 'TOEIC Listening Basics', order_index: 1 },
    // Course 8 - Business English
    { id: 16, course_id: 8, title: 'Business Email Writing', order_index: 1 },
    // Course 9 - UI/UX
    { id: 17, course_id: 9, title: 'Introduction to UI/UX', order_index: 1 },
    // Course 10 - Photoshop
    { id: 18, course_id: 10, title: 'Photoshop Basics', order_index: 1 },
    // Course 11 - Premiere
    { id: 19, course_id: 11, title: 'Video Editing Basics', order_index: 1 },
    // Course 12 - Digital Marketing
    { id: 20, course_id: 12, title: 'Marketing Overview', order_index: 1 },
    // Course 13 - Excel
    { id: 21, course_id: 13, title: 'Excel Fundamentals', order_index: 1 },
    // Course 14 - Presentation
    { id: 22, course_id: 14, title: 'Presentation Skills', order_index: 1 },
    // Course 15 - Time Management
    { id: 23, course_id: 15, title: 'Productivity Basics', order_index: 1 },
    // Course 16 - Demo Course (existing)
    { id: 24, course_id: 16, title: 'Layout Demonstrations', order_index: 1 },
    { id: 25, course_id: 16, title: 'Block Type Demonstrations', order_index: 2 },
];
