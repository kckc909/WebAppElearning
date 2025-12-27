/**
 * Database Enrollments API Implementation
 * Pure database logic - no if-else statements
 */

import { IEnrollmentsApi } from '../../interfaces/IEnrollmentsApi';
import { successResponse, errorResponse, ApiResponse } from '../../config';
import axiosInstance from '../../api';

export class DbEnrollmentsApi implements IEnrollmentsApi {
    async getMyEnrollments(studentId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/enrollments/my', { params: { student_id: studentId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch enrollments');
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/enrollments/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch enrollment');
        }
    }

    async getCourseProgress(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/enrollments/course/${courseId}/progress`, {
                params: { student_id: studentId }
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch progress');
        }
    }

    async updateLessonProgress(enrollmentId: number, lessonId: number, isCompleted: boolean): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/enrollments/progress', {
                enrollment_id: enrollmentId,
                lesson_id: lessonId,
                is_completed: isCompleted
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update progress');
        }
    }

    async getCertificate(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/enrollments/certificate/${courseId}`, {
                params: { student_id: studentId }
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch certificate');
        }
    }
}
