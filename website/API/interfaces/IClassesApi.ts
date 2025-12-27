/**
 * INTERFACE: IClassesApi
 * Contract for Classes API implementations
 */

import { ApiResponse } from '../config';

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

export interface IClassesApi {
    /**
     * GET /classes/calendar - Lấy lịch tất cả lớp học của student
     */
    getCalendar(studentId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes/:classId/calendar - Lấy lịch 1 lớp học cụ thể
     */
    getClassCalendar(classId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes/:id/assignments - Lấy bài tập
     */
    getAssignments(classId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes/:id/materials - Lấy tài liệu
     */
    getMaterials(classId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes - Lấy danh sách lớp học
     */
    getAll(params?: {
        instructor_id?: number;
        course_id?: number;
        status?: number;
    }): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes/my - Lấy lớp học của student
     */
    getMyClasses(studentId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /classes/:id - Lấy chi tiết lớp học
     */
    getById(id: number): Promise<ApiResponse<any>>;

    /**
     * POST /classes/:id/join - Tham gia lớp học
     */
    join(classId: number, studentId: number): Promise<ApiResponse<any>>;
}
