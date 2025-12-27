/**
 * Database Attendance API Implementation
 */

import { IAttendanceApi } from '../../interfaces/IAttendanceApi';
import { ApiResponse, successResponse, errorResponse } from '../../config';
import axiosInstance from '../../api';

export class DbAttendanceApi implements IAttendanceApi {
    async getByClass(classId: number, sessionDate?: string): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/attendance/class/${classId}`, {
                params: { sessionDate }
            });
            const data = response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch attendance');
        }
    }

    async getByStudent(studentId: number, classId?: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get(`/attendance/student/${studentId}`, {
                params: { classId }
            });
            const data = response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch attendance');
        }
    }

    async getStats(classId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/attendance/class/${classId}/stats`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch stats');
        }
    }

    async markAttendance(data: {
        class_id: number;
        student_id: number;
        session_date: string;
        status: string;
        notes?: string;
        marked_by?: number;
    }): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/attendance/mark', data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to mark attendance');
        }
    }

    async bulkMarkAttendance(data: {
        class_id: number;
        session_date: string;
        attendances: Array<{
            student_id: number;
            status: string;
            notes?: string;
        }>;
        marked_by?: number;
    }): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/attendance/bulk-mark', data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to bulk mark attendance');
        }
    }
}
