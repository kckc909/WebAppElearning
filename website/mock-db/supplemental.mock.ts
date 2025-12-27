/**
 * SUPPLEMENTAL MOCK DATA
 * Data not currently in mock-db schema but needed for application functionality
 * 
 * These will eventually be:
 * - Migrated to proper DB tables (Phase 11)
 * - OR maintained as derived/computed views
 */

// ============================================
// COURSE_PROGRESS - Tiến độ học bài
// ============================================
export const COURSE_PROGRESS = [
    { id: 1, enrollment_id: 1, lesson_id: 1, is_completed: true, completed_at: '2024-08-02' },
    { id: 2, enrollment_id: 1, lesson_id: 2, is_completed: true, completed_at: '2024-08-03' },
    { id: 3, enrollment_id: 1, lesson_id: 3, is_completed: true, completed_at: '2024-08-05' },
    { id: 4, enrollment_id: 1, lesson_id: 4, is_completed: true, completed_at: '2024-08-07' },
    { id: 5, enrollment_id: 1, lesson_id: 5, is_completed: false, completed_at: null },
];

// ============================================
// CLASS_ASSIGNMENTS - Bài tập lớp
// ============================================
export const CLASS_ASSIGNMENTS = [
    { id: 1, class_id: 1, title: 'Writing Task 1: Bar Chart Analysis', description: 'Phân tích biểu đồ cột về doanh số theo quý', file_url: '/assignments/ielts-writing-task1.pdf', due_date: '2024-11-10T23:59:00', created_at: '2024-11-01' },
    { id: 2, class_id: 1, title: 'Speaking Practice: Part 2 Cue Card', description: 'Record bài nói về chủ đề Describe a place', file_url: null, due_date: '2024-11-15T23:59:00', created_at: '2024-11-05' },
    { id: 3, class_id: 3, title: 'React Component Lifecycle Quiz', description: 'Quiz về lifecycle methods và hooks', file_url: null, due_date: '2024-12-10T12:00:00', created_at: '2024-12-01' },
];

// ============================================
// CLASS_MATERIALS - Tài liệu lớp
// ============================================
export const CLASS_MATERIALS = [
    { id: 1, class_id: 1, title: 'IELTS Speaking Band Descriptors', description: 'Tiêu chí chấm điểm Speaking chính thức từ British Council', file_url: '/materials/ielts-band-descriptors.pdf', uploaded_at: '2024-10-28' },
    { id: 2, class_id: 1, title: 'Top 50 Part 1 Topics', description: '50 chủ đề Part 1 thường gặp nhất', file_url: '/materials/part1-topics.pdf', uploaded_at: '2024-10-28' },
    { id: 3, class_id: 3, title: 'React Cheat Sheet', description: 'Tổng hợp syntax và patterns React', file_url: '/materials/react-cheatsheet.pdf', uploaded_at: '2024-11-25' },
];
