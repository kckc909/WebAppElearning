/**
 * Database Notifications API Implementation
 * Pure database logic - no if-else statements
 */

import { INotificationsApi } from '../../interfaces/INotificationsApi';
import { successResponse, errorResponse, ApiResponse } from '../../config';
import axiosInstance from '../../api';

export class DbNotificationsApi implements INotificationsApi {
    async getAll(userId: number): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/notifications', { params: { user_id: userId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch notifications');
        }
    }

    async getUnreadCount(userId: number): Promise<ApiResponse<number>> {
        try {
            const response = await axiosInstance.get('/notifications/unread-count', { params: { user_id: userId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch count');
        }
    }

    async markAsRead(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.put(`/notifications/${id}/read`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to mark as read');
        }
    }

    async markAllAsRead(userId: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.put('/notifications/read-all', { user_id: userId });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to mark all as read');
        }
    }

    async delete(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.delete(`/notifications/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to delete notification');
        }
    }
}
