/**
 * DATABASE IMPLEMENTATION: ClassesApi
 * Pure database logic - NO if-else, NO mock data
 */

import { IClassesApi } from '../../interfaces/IClassesApi';
import { successResponse, errorResponse, ApiResponse, handleApiError } from '../../config';
import axiosInstance from '../../api';

export class DbClassesApi implements IClassesApi {
    async getCalendar(studentId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/classes/calendar', { params: { student_id: studentId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch calendar');
        }
    }

    async getClassCalendar(classId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/classes/${classId}/calendar`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch calendar');
        }
    }

    async getAssignments(classId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/classes/${classId}/assignments`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch assignments');
        }
    }

    async getMaterials(classId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/classes/${classId}/materials`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch materials');
        }
    }

    async getAll(params?: {
        instructor_id?: number;
        course_id?: number;
        status?: number;
    }): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/classes', { params });
            // Backend returns { classes: [...] }
            const data = response.data?.classes || response.data || [];
            return successResponse(Array.isArray(data) ? data : []);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Classes API] getAll error:', apiError);
            return errorResponse(apiError.message, []);
        }
    }

    async getMyClasses(studentId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/classes/my', { params: { student_id: studentId } });
            const data = response.data || [];
            return successResponse(Array.isArray(data) ? data : []);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Classes API] getMyClasses error:', apiError);
            return errorResponse(apiError.message, []);
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/classes/${id}`);
            // Backend returns { class: {...} }
            const data = response.data?.class || response.data;
            if (!data) {
                return errorResponse('Không tìm thấy lớp học', null);
            }
            return successResponse(data);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Classes API] getById error:', apiError);
            return errorResponse(apiError.message, null);
        }
    }

    async join(classId: number, studentId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post(`/classes/${classId}/join`, { student_id: studentId });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to join class');
        }
    }
}
