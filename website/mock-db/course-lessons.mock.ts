/**
 * MOCK DB - course_lessons
 * Complete mock data for lessons
 * Course 1 & 2: Full lessons with various layouts
 * Other courses: 1 lesson each
 */

export interface CourseLesson {
    id: number;
    section_id: number;
    title: string;
    order_index: number;
    layout: number | null;
    duration?: number; // minutes
    is_preview?: boolean;
}

export const COURSE_LESSONS: CourseLesson[] = [
    // =============================================
    // COURSE 1 - ReactJS (FULL - 20 Lessons)
    // =============================================

    // Section 1: Giới thiệu & Cài đặt (4 lessons)
    { id: 1, section_id: 1, title: 'Chào mừng đến với khóa học', order_index: 1, layout: 1, duration: 10, is_preview: true },
    { id: 2, section_id: 1, title: 'ReactJS là gì? Tại sao nên học?', order_index: 2, layout: 1, duration: 15, is_preview: true },
    { id: 3, section_id: 1, title: 'Cài đặt Node.js và VS Code', order_index: 3, layout: 1, duration: 12, is_preview: false },
    { id: 4, section_id: 1, title: 'Tạo dự án React đầu tiên', order_index: 4, layout: 2, duration: 20, is_preview: false },

    // Section 2: React Cơ Bản (4 lessons)
    { id: 5, section_id: 2, title: 'JSX là gì?', order_index: 1, layout: 1, duration: 15, is_preview: false },
    { id: 6, section_id: 2, title: 'Functional Components', order_index: 2, layout: 2, duration: 18, is_preview: false },
    { id: 7, section_id: 2, title: 'Class Components (Legacy)', order_index: 3, layout: 1, duration: 15, is_preview: false },
    { id: 8, section_id: 2, title: 'Bài tập Components', order_index: 4, layout: 3, duration: 30, is_preview: false },

    // Section 3: State & Props (4 lessons)
    { id: 9, section_id: 3, title: 'State là gì?', order_index: 1, layout: 1, duration: 15, is_preview: false },
    { id: 10, section_id: 3, title: 'Props và Data Flow', order_index: 2, layout: 2, duration: 18, is_preview: false },
    { id: 11, section_id: 3, title: 'Lifting State Up', order_index: 3, layout: 1, duration: 20, is_preview: false },
    { id: 12, section_id: 3, title: 'Bài tập State & Props', order_index: 4, layout: 3, duration: 35, is_preview: false },

    // Section 4: React Hooks (4 lessons)
    { id: 13, section_id: 4, title: 'useState Hook', order_index: 1, layout: 2, duration: 20, is_preview: false },
    { id: 14, section_id: 4, title: 'useEffect Hook', order_index: 2, layout: 2, duration: 25, is_preview: false },
    { id: 15, section_id: 4, title: 'useContext & Custom Hooks', order_index: 3, layout: 1, duration: 22, is_preview: false },
    { id: 16, section_id: 4, title: 'Bài tập Hooks', order_index: 4, layout: 3, duration: 40, is_preview: false },

    // Section 5: React Router & Project (4 lessons)
    { id: 17, section_id: 5, title: 'React Router Basics', order_index: 1, layout: 2, duration: 18, is_preview: false },
    { id: 18, section_id: 5, title: 'Navigation & Protected Routes', order_index: 2, layout: 1, duration: 20, is_preview: false },
    { id: 19, section_id: 5, title: 'Final Project Setup', order_index: 3, layout: 2, duration: 25, is_preview: false },
    { id: 20, section_id: 5, title: 'Final Project Deployment', order_index: 4, layout: 1, duration: 30, is_preview: false },

    // =============================================
    // COURSE 2 - Python (FULL - 20 Lessons)
    // =============================================

    // Section 6: Giới thiệu Python (4 lessons)
    { id: 21, section_id: 6, title: 'Chào mừng đến với Python', order_index: 1, layout: 1, duration: 10, is_preview: true },
    { id: 22, section_id: 6, title: 'Cài đặt Python & IDE', order_index: 2, layout: 1, duration: 12, is_preview: true },
    { id: 23, section_id: 6, title: 'Hello World đầu tiên', order_index: 3, layout: 2, duration: 8, is_preview: false },
    { id: 24, section_id: 6, title: 'Cú pháp cơ bản Python', order_index: 4, layout: 1, duration: 15, is_preview: false },

    // Section 7: Data Types & Variables (4 lessons)
    { id: 25, section_id: 7, title: 'Numbers & Strings', order_index: 1, layout: 2, duration: 18, is_preview: false },
    { id: 26, section_id: 7, title: 'Lists & Tuples', order_index: 2, layout: 2, duration: 20, is_preview: false },
    { id: 27, section_id: 7, title: 'Dictionaries & Sets', order_index: 3, layout: 1, duration: 22, is_preview: false },
    { id: 28, section_id: 7, title: 'Bài tập Data Types', order_index: 4, layout: 3, duration: 30, is_preview: false },

    // Section 8: Functions & OOP (4 lessons)
    { id: 29, section_id: 8, title: 'Defining Functions', order_index: 1, layout: 2, duration: 20, is_preview: false },
    { id: 30, section_id: 8, title: 'Classes & Objects', order_index: 2, layout: 2, duration: 25, is_preview: false },
    { id: 31, section_id: 8, title: 'Inheritance & Polymorphism', order_index: 3, layout: 1, duration: 28, is_preview: false },
    { id: 32, section_id: 8, title: 'Bài tập OOP', order_index: 4, layout: 3, duration: 40, is_preview: false },

    // Section 9: Libraries & Packages (4 lessons)
    { id: 33, section_id: 9, title: 'Pip & Virtual Environments', order_index: 1, layout: 1, duration: 15, is_preview: false },
    { id: 34, section_id: 9, title: 'NumPy Basics', order_index: 2, layout: 2, duration: 25, is_preview: false },
    { id: 35, section_id: 9, title: 'Pandas for Data Analysis', order_index: 3, layout: 2, duration: 30, is_preview: false },
    { id: 36, section_id: 9, title: 'Bài tập Libraries', order_index: 4, layout: 3, duration: 35, is_preview: false },

    // Section 10: Final Project (4 lessons)
    { id: 37, section_id: 10, title: 'Project Overview', order_index: 1, layout: 1, duration: 12, is_preview: false },
    { id: 38, section_id: 10, title: 'Data Collection & Cleaning', order_index: 2, layout: 2, duration: 25, is_preview: false },
    { id: 39, section_id: 10, title: 'Analysis & Visualization', order_index: 3, layout: 2, duration: 30, is_preview: false },
    { id: 40, section_id: 10, title: 'Final Presentation', order_index: 4, layout: 1, duration: 20, is_preview: false },

    // =============================================
    // OTHER COURSES - Minimal (1 Lesson each)
    // =============================================

    // Course 3 - NodeJS (Section 11)
    { id: 41, section_id: 11, title: 'Welcome to NodeJS', order_index: 1, layout: 1, duration: 15, is_preview: true },

    // Course 4 - Machine Learning (Section 12)
    { id: 42, section_id: 12, title: 'What is Machine Learning?', order_index: 1, layout: 1, duration: 20, is_preview: true },

    // Course 5 - Flutter (Section 13)
    { id: 43, section_id: 13, title: 'Introduction to Flutter', order_index: 1, layout: 1, duration: 18, is_preview: true },

    // Course 6 - IELTS Speaking (Section 14)
    { id: 44, section_id: 14, title: 'IELTS Speaking Overview', order_index: 1, layout: 1, duration: 15, is_preview: true },

    // Course 7 - TOEIC (Section 15)
    { id: 45, section_id: 15, title: 'TOEIC Test Structure', order_index: 1, layout: 1, duration: 12, is_preview: true },

    // Course 8 - Business English (Section 16)
    { id: 46, section_id: 16, title: 'Professional Email Writing', order_index: 1, layout: 1, duration: 20, is_preview: true },

    // Course 9 - UI/UX (Section 17)
    { id: 47, section_id: 17, title: 'UI vs UX Explained', order_index: 1, layout: 1, duration: 15, is_preview: true },

    // Course 10 - Photoshop (Section 18)
    { id: 48, section_id: 18, title: 'Photoshop Interface', order_index: 1, layout: 1, duration: 18, is_preview: true },

    // Course 11 - Premiere (Section 19)
    { id: 49, section_id: 19, title: 'Premiere Pro Basics', order_index: 1, layout: 1, duration: 20, is_preview: true },

    // Course 12 - Digital Marketing (Section 20)
    { id: 50, section_id: 20, title: 'Digital Marketing Overview', order_index: 1, layout: 1, duration: 15, is_preview: true },

    // Course 13 - Excel (Section 21)
    { id: 51, section_id: 21, title: 'Excel Interface & Basics', order_index: 1, layout: 1, duration: 12, is_preview: true },

    // Course 14 - Presentation (Section 22)
    { id: 52, section_id: 22, title: 'Building Confidence', order_index: 1, layout: 1, duration: 18, is_preview: true },

    // Course 15 - Time Management (Section 23)
    { id: 53, section_id: 23, title: 'Time Management Principles', order_index: 1, layout: 1, duration: 15, is_preview: true },

    // =============================================
    // COURSE 16 - Demo Course (existing expanded)
    // =============================================
    // Section 24 - Layout Demonstrations
    { id: 54, section_id: 24, title: 'Single Layout Demo', order_index: 1, layout: null, duration: 10, is_preview: true },
    { id: 55, section_id: 24, title: 'Split Layout Demo', order_index: 2, layout: null, duration: 12, is_preview: false },
    { id: 56, section_id: 24, title: 'Sidebar Left Demo', order_index: 3, layout: null, duration: 15, is_preview: false },
    { id: 57, section_id: 24, title: 'Sidebar Right Demo', order_index: 4, layout: null, duration: 15, is_preview: false },
    { id: 58, section_id: 24, title: 'Grid Layout Demo', order_index: 5, layout: null, duration: 20, is_preview: false },
    { id: 59, section_id: 24, title: 'Stacked Layout Demo', order_index: 6, layout: null, duration: 18, is_preview: false },
    { id: 60, section_id: 24, title: 'Focus Layout Demo', order_index: 7, layout: null, duration: 10, is_preview: false },

    // Section 25 - Block Type Demonstrations
    { id: 61, section_id: 25, title: 'Text & Video Blocks', order_index: 1, layout: null, duration: 15, is_preview: false },
    { id: 62, section_id: 25, title: 'Quiz & IDE Blocks', order_index: 2, layout: null, duration: 25, is_preview: false },
    { id: 63, section_id: 25, title: 'Document & Embed Blocks', order_index: 3, layout: null, duration: 20, is_preview: false },
    { id: 64, section_id: 25, title: 'Practice & Image Blocks', order_index: 4, layout: null, duration: 30, is_preview: false },
    { id: 65, section_id: 25, title: 'Mixed Content Demo', order_index: 5, layout: null, duration: 25, is_preview: false },
    { id: 66, section_id: 25, title: 'Advanced Features Demo', order_index: 6, layout: null, duration: 20, is_preview: false },
    { id: 67, section_id: 25, title: 'Complete Lesson Example', order_index: 7, layout: null, duration: 35, is_preview: false },
];

// Helper function to get lessons by section
export const getLessonsBySectionId = (sectionId: number): CourseLesson[] => {
    return COURSE_LESSONS.filter(l => l.section_id === sectionId);
};
