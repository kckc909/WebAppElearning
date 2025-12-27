/**
 * Mock Notifications API Implementation
 * Pure mock logic - no if-else statements
 */

import { INotificationsApi } from '../../interfaces/INotificationsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockNotificationsApi implements INotificationsApi {
    async getAll(userId: number): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const notifications = dataSource.getNotificationsByUser(userId)
            .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return successResponse(notifications);
    }

    async getUnreadCount(userId: number): Promise<ApiResponse<number>> {
        await simulateDelay(100);
        const notifications = dataSource.getNotificationsByUser(userId);
        const count = notifications.filter((n: any) => !n.is_read).length;
        return successResponse(count);
    }

    async markAsRead(id: number): Promise<ApiResponse<any>> {
        await simulateDelay(100);
        const allNotifications = dataSource.getNotificationsByUser(0) as any[];
        const notification = allNotifications.find((n: any) => n.id === id);
        if (!notification) {
            return errorResponse('Notification not found', null);
        }
        notification.is_read = true;
        return successResponse(notification, 'Marked as read');
    }

    async markAllAsRead(userId: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const notifications = dataSource.getNotificationsByUser(userId);
        notifications.forEach((n: any) => {
            n.is_read = true;
        });
        return successResponse(null, 'All notifications marked as read');
    }

    async delete(id: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const allNotifications = dataSource.getNotificationsByUser(0) as any[];
        const index = allNotifications.findIndex((n: any) => n.id === id);
        if (index === -1) {
            return errorResponse('Notification not found', null);
        }
        allNotifications.splice(index, 1);
        return successResponse(null, 'Notification deleted');
    }
}
