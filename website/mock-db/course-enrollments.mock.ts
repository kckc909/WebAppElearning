/**
 * MOCK DB - course_enrollments
 */

export interface CourseEnrollment {
    id: number;
    course_id: number;
    student_id: number;
    enrolled_at: string;
    progress: number;
    certificate_url: string | null;
    last_lesson_id: number | null;
    status: number;
}

export const COURSE_ENROLLMENTS: CourseEnrollment[] = [
    { id: 1, course_id: 1, student_id: 7, enrolled_at: '2024-08-01T00:00:00.000Z', progress: 65, certificate_url: null, status: 1, last_lesson_id: 5 },
    { id: 2, course_id: 2, student_id: 7, enrolled_at: '2024-09-15T00:00:00.000Z', progress: 30, certificate_url: null, status: 1, last_lesson_id: 2 },
    { id: 3, course_id: 6, student_id: 7, enrolled_at: '2024-10-01T00:00:00.000Z', progress: 100, certificate_url: '/certificates/cert-001.pdf', status: 1, last_lesson_id: null },
    { id: 4, course_id: 1, student_id: 8, enrolled_at: '2024-08-15T00:00:00.000Z', progress: 80, certificate_url: null, status: 1, last_lesson_id: 7 },
    { id: 5, course_id: 9, student_id: 8, enrolled_at: '2024-09-01T00:00:00.000Z', progress: 45, certificate_url: null, status: 1, last_lesson_id: 3 },
    { id: 6, course_id: 7, student_id: 9, enrolled_at: '2024-07-01T00:00:00.000Z', progress: 100, certificate_url: '/certificates/cert-002.pdf', status: 1, last_lesson_id: null },
    { id: 7, course_id: 12, student_id: 10, enrolled_at: '2024-10-15T00:00:00.000Z', progress: 20, certificate_url: null, status: 1, last_lesson_id: 1 },
];
