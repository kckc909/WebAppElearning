/**
 * MOCK DB - class_students
 */

export interface ClassStudent {
    id: number;
    class_id: number;
    student_id: number;
    joined_at: string;
    status: number;
}

export const CLASS_STUDENTS: ClassStudent[] = [
    { id: 1, class_id: 1, student_id: 7, joined_at: '2024-10-20T00:00:00.000Z', status: 1 },
    { id: 2, class_id: 1, student_id: 8, joined_at: '2024-10-22T00:00:00.000Z', status: 1 },
    { id: 3, class_id: 2, student_id: 9, joined_at: '2024-10-25T00:00:00.000Z', status: 1 },
    { id: 4, class_id: 3, student_id: 7, joined_at: '2024-11-05T00:00:00.000Z', status: 1 },
    { id: 5, class_id: 3, student_id: 10, joined_at: '2024-11-06T00:00:00.000Z', status: 1 },
];
