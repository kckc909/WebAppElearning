/**
 * HOOKS: useNotifications
 * Custom hooks for Notifications API
 */

import { useState } from 'react';
import { notificationsApi } from '../API';
import type { ApiResponse } from '../API';

/**
 * Hook for getting all notifications
 */
export function useNotifications(userId: number) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await notificationsApi.getAll(userId);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch notifications');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchNotifications };
}

/**
 * Hook for getting unread count
 */
export function useUnreadCount(userId: number) {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUnreadCount = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await notificationsApi.getUnreadCount(userId);
            if (response.success) {
                setCount(response.data);
            } else {
                setError(response.error || 'Failed to fetch count');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { count, loading, error, refetch: fetchUnreadCount };
}

/**
 * Hook for marking notification as read
 */
export function useMarkAsRead() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const markAsRead = async (id: number): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await notificationsApi.markAsRead(id);
            if (!response.success) {
                setError(response.error || 'Failed to mark as read');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { markAsRead, loading, error };
}

/**
 * Hook for marking all notifications as read
 */
export function useMarkAllAsRead() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const markAllAsRead = async (userId: number): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await notificationsApi.markAllAsRead(userId);
            if (!response.success) {
                setError(response.error || 'Failed to mark all as read');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { markAllAsRead, loading, error };
}

/**
 * Hook for deleting notification
 */
export function useDeleteNotification() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteNotification = async (id: number): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await notificationsApi.delete(id);
            if (!response.success) {
                setError(response.error || 'Failed to delete notification');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { deleteNotification, loading, error };
}
