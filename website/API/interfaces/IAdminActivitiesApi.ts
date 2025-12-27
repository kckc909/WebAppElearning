/**
 * Admin Activities API Interface
 */

import { ApiResponse } from '../config';

export interface AdminActivity {
    id: number;
    type: 'course_submitted' | 'course_updated' | 'user_registered' | 'payment_received' | 'other';
    title: string;
    description: string;
    instructor_id?: number;
    instructor_name?: string;
    course_id?: number;
    course_name?: string;
    timestamp: string;
    is_read: boolean;
}

export interface IAdminActivitiesApi {
    getAll(filters?: { type?: string; is_read?: boolean }): Promise<ApiResponse<AdminActivity[]>>;
    getRecent(limit?: number): Promise<ApiResponse<AdminActivity[]>>;
    markAsRead(id: number): Promise<ApiResponse<void>>;
    markAllAsRead(): Promise<ApiResponse<void>>;
}
