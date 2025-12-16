/**
 * Notifications API Service
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse } from './config';
import axiosInstance from './api';
import { NOTIFICATIONS } from '../mockData';

class NotificationsApiService {
    // GET /notifications - Lấy thông báo của user
    async getAll(userId: number): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const notifications = NOTIFICATIONS.filter(n => n.user_id === userId)
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            return successResponse(notifications);
        }

        try {
            const response = await axiosInstance.get('/notifications', { params: { user_id: userId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch notifications');
        }
    }

    // GET /notifications/unread-count - Đếm thông báo chưa đọc
    async getUnreadCount(userId: number): Promise<ApiResponse<number>> {
        if (USE_MOCK_API) {
            await simulateDelay(100);
            const count = NOTIFICATIONS.filter(n => n.user_id === userId && !n.is_read).length;
            return successResponse(count);
        }

        try {
            const response = await axiosInstance.get('/notifications/unread-count', { params: { user_id: userId } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch count');
        }
    }

    // PUT /notifications/:id/read - Đánh dấu đã đọc
    async markAsRead(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay(100);
            const notification = NOTIFICATIONS.find(n => n.id === id);
            if (!notification) {
                return errorResponse('Notification not found', null);
            }
            notification.is_read = true;
            return successResponse(notification, 'Marked as read');
        }

        try {
            const response = await axiosInstance.put(`/notifications/${id}/read`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to mark as read');
        }
    }

    // PUT /notifications/read-all - Đánh dấu tất cả đã đọc
    async markAllAsRead(userId: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            NOTIFICATIONS.filter(n => n.user_id === userId).forEach(n => {
                n.is_read = true;
            });
            return successResponse(null, 'All notifications marked as read');
        }

        try {
            const response = await axiosInstance.put('/notifications/read-all', { user_id: userId });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to mark all as read');
        }
    }

    // DELETE /notifications/:id - Xóa thông báo
    async delete(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const index = NOTIFICATIONS.findIndex(n => n.id === id);
            if (index === -1) {
                return errorResponse('Notification not found', null);
            }
            NOTIFICATIONS.splice(index, 1);
            return successResponse(null, 'Notification deleted');
        }

        try {
            const response = await axiosInstance.delete(`/notifications/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to delete notification');
        }
    }
}

export const notificationsApi = new NotificationsApiService();
