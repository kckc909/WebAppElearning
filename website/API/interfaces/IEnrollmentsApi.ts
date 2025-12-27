/**
 * INTERFACE: IEnrollmentsApi
 * Contract for Enrollments API implementations
 */

import { ApiResponse } from '../config';

export interface IEnrollmentsApi {
    /**
     * GET /enrollments/my - Lấy khóa học đã đăng ký của user
     */
    getMyEnrollments(studentId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /enrollments/:id - Lấy chi tiết enrollment
     */
    getById(id: number): Promise<ApiResponse<any>>;

    /**
     * GET /enrollments/course/:courseId/progress - Lấy tiến độ học
     */
    getCourseProgress(courseId: number, studentId: number): Promise<ApiResponse<any>>;

    /**
     * POST /enrollments/progress - Cập nhật tiến độ bài học
     */
    updateLessonProgress(
        enrollmentId: number,
        lessonId: number,
        isCompleted: boolean
    ): Promise<ApiResponse<any>>;

    /**
     * GET /enrollments/certificate/:courseId - Lấy chứng chỉ
     */
    getCertificate(courseId: number, studentId: number): Promise<ApiResponse<any>>;
}
