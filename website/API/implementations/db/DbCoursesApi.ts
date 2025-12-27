/**
 * DATABASE IMPLEMENTATION: CoursesApi
 * Pure database logic - NO if-else, NO mock data
 */

import { ICoursesApi, Course } from '../../interfaces/ICoursesApi';
import { successResponse, errorResponse, ApiResponse, handleApiError } from '../../config';
import axiosInstance from '../../api';

export class DbCoursesApi implements ICoursesApi {
    async getAll(params?: {
        category_id?: number;
        instructor_id?: number;
        search?: string;
        status?: string;
        limit?: number;
        page?: number;
    }): Promise<ApiResponse<Course[]>> {
        try {
            console.log('[DbCoursesApi] getAll called with params:', params);
            const response = await axiosInstance.get('/courses', { params });
            console.log('[DbCoursesApi] getAll response:', response.data);
            // Backend trả về { success: true, data: [...] }
            const data = response.data?.data || response.data || [];
            if (Array.isArray(data) && data.length === 0) {
                return successResponse([], 'Chưa có khóa học nào');
            }
            return successResponse(data);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Courses API] getAll error:', apiError);
            return errorResponse(apiError.message, []);
        }
    }

    async getById(id: number): Promise<ApiResponse<Course | null>> {
        try {
            const response = await axiosInstance.get(`/courses/${id}`);
            // Backend trả về { success: true, data: {...} }
            const data = response.data?.data || response.data;
            if (!data) {
                return errorResponse('Không tìm thấy khóa học', null);
            }
            return successResponse(data);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Courses API] getById error:', apiError);
            return errorResponse(apiError.message, null);
        }
    }

    async getReviews(courseId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/courses/${courseId}/reviews`);
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch reviews', []);
        }
    }

    async addReview(
        courseId: number,
        data: { rating: number; comment: string; student_id: number }
    ): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/reviews`, data);
            const result = response.data?.data || response.data;
            return successResponse(result);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to add review');
        }
    }

    async getCategories(): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/course-categories');
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch categories', []);
        }
    }

    async enroll(courseId: number, studentId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/enroll`, {
                student_id: studentId
            });
            const data = response.data?.data || response.data;
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to enroll');
        }
    }

    async getFeatured(limit: number = 8): Promise<ApiResponse<Course[]>> {
        try {
            const response = await axiosInstance.get('/courses/featured', {
                params: { limit }
            });
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch featured courses', []);
        }
    }

    async getByCategory(categoryId: number): Promise<ApiResponse<Course[]>> {
        try {
            const response = await axiosInstance.get(`/courses/category/${categoryId}`);
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch courses by category', []);
        }
    }

    async getSections(courseId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/courses/${courseId}/sections`);
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch course sections', []);
        }
    }

    async submitForReview(courseId: number, instructorId: number): Promise<ApiResponse<Course>> {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/submit`, {
                instructor_id: instructorId
            });
            const data = response.data?.data || response.data;
            return successResponse(data, response.data?.message || 'Course submitted for review');
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to submit course for review');
        }
    }

    async approveCourse(courseId: number, adminId: number): Promise<ApiResponse<Course>> {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/approve`, {
                admin_id: adminId
            });
            const data = response.data?.data || response.data;
            return successResponse(data, response.data?.message || 'Course approved successfully');
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to approve course');
        }
    }

    async rejectCourse(courseId: number, adminId: number, reason: string): Promise<ApiResponse<Course>> {
        try {
            const response = await axiosInstance.post(`/courses/${courseId}/reject`, {
                admin_id: adminId,
                reason: reason
            });
            const data = response.data?.data || response.data;
            return successResponse(data, response.data?.message || 'Course rejected');
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to reject course');
        }
    }

    async getPendingCourses(): Promise<ApiResponse<Course[]>> {
        try {
            const response = await axiosInstance.get('/courses/pending');
            const data = response.data?.data || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch pending courses', []);
        }
    }
}
