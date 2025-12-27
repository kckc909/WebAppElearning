/**
 * Database System Logs API Implementation
 */

import { ISystemLogsApi } from '../../interfaces/ISystemLogsApi';
import { ApiResponse, successResponse, errorResponse } from '../../config';
import axiosInstance from '../../api';

export class DbSystemLogsApi implements ISystemLogsApi {
    async getAll(params?: {
        level?: string;
        category?: string;
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
    }): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/system-logs', { params });
            const data = response.data?.logs || response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch system logs');
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/system-logs/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch system log');
        }
    }

    async getStats(): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get('/system-logs/stats');
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch stats');
        }
    }

    async create(data: {
        level: string;
        category?: string;
        message: string;
        context?: any;
    }): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/system-logs', data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to create log');
        }
    }

    async cleanup(days?: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.delete('/system-logs/cleanup', {
                params: { days }
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to cleanup logs');
        }
    }
}
