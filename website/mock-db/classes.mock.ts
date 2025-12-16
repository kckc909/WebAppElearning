/**
 * MOCK DB - classes
 */

export interface Class {
    id: number;
    course_id: number;
    instructor_id: number;
    title: string;
    description: string | null;
    start_date: string | null;
    end_date: string | null;
    meeting_link: string | null;
    max_students: number;
    schedule: string | null;
    status: number;
    created_at: string;
}

export const CLASSES: Class[] = [
    { id: 1, course_id: 6, instructor_id: 4, title: 'IELTS Speaking K15', description: 'Lớp luyện Speaking IELTS khóa 15', start_date: '2024-11-01T00:00:00.000Z', end_date: '2025-01-31T00:00:00.000Z', meeting_link: 'https://meet.google.com/ielts-k15', max_students: 20, schedule: 'T2, T4, T6 - 19:30', status: 1, created_at: '2024-10-15T00:00:00.000Z' },
    { id: 2, course_id: 7, instructor_id: 4, title: 'TOEIC 900+ K10', description: 'Lớp luyện thi TOEIC mục tiêu 900+', start_date: '2024-11-15T00:00:00.000Z', end_date: '2025-02-15T00:00:00.000Z', meeting_link: 'https://meet.google.com/toeic-k10', max_students: 25, schedule: 'T3, T5, T7 - 20:00', status: 1, created_at: '2024-10-20T00:00:00.000Z' },
    { id: 3, course_id: 1, instructor_id: 3, title: 'ReactJS Bootcamp K5', description: 'Bootcamp ReactJS 3 tháng', start_date: '2024-12-01T00:00:00.000Z', end_date: '2025-02-28T00:00:00.000Z', meeting_link: 'https://meet.google.com/react-k5', max_students: 30, schedule: 'T2, T4 - 20:00; T7 - 09:00', status: 1, created_at: '2024-11-01T00:00:00.000Z' },
];
