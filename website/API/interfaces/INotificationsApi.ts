/**
 * INTERFACE: INotificationsApi
 * Contract for Notifications API implementations
 */

import { ApiResponse } from '../config';

export interface INotificationsApi {
    /**
     * GET /notifications - Lấy thông báo của user
     */
    getAll(userId: number): Promise<ApiResponse<any[]>>;

    /**
     * GET /notifications/unread-count - Đếm thông báo chưa đọc
     */
    getUnreadCount(userId: number): Promise<ApiResponse<number>>;

    /**
     * PUT /notifications/:id/read - Đánh dấu đã đọc
     */
    markAsRead(id: number): Promise<ApiResponse<any>>;

    /**
     * PUT /notifications/read-all - Đánh dấu tất cả đã đọc
     */
    markAllAsRead(userId: number): Promise<ApiResponse<any>>;

    /**
     * DELETE /notifications/:id - Xóa thông báo
     */
    delete(id: number): Promise<ApiResponse<any>>;
}
