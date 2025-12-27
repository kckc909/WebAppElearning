/**
 * Database Admin Activities API Implementation
 * Uses audit_logs as backend
 */

import { IAdminActivitiesApi } from '../../interfaces/IAdminActivitiesApi';
import { ApiResponse, successResponse, errorResponse } from '../../config';
import axiosInstance from '../../api';

export class DbAdminActivitiesApi implements IAdminActivitiesApi {
    async getAll(filters?: {
        type?: string;
        is_read?: boolean;
    }): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/audit-logs', { params: filters });
            const data = response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch activities');
        }
    }

    async getRecent(limit: number = 10): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/audit-logs', {
                params: {
                    limit,
                    sortBy: 'created_at',
                    sortOrder: 'desc'
                }
            });
            const data = response.data || [];
            return successResponse(data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch recent activities');
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/audit-logs/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch activity');
        }
    }

    async markAsRead(id: number): Promise<ApiResponse<void>> {
        try {
            await axiosInstance.patch(`/audit-logs/${id}/read`);
            return successResponse(undefined);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to mark as read');
        }
    }

    async markAllAsRead(): Promise<ApiResponse<void>> {
        try {
            await axiosInstance.patch('/audit-logs/read-all');
            return successResponse(undefined);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to mark all as read');
        }
    }

    async getStats(): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get('/audit-logs/stats');
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.response?.data?.message || 'Failed to fetch stats');
        }
    }
}
