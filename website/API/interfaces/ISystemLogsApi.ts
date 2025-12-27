/**
 * System Logs API Interface
 */

import { ApiResponse } from '../config';

export interface SystemLog {
    id: number;
    timestamp: string;
    level: 'info' | 'warning' | 'error' | 'critical';
    category: string;
    message: string;
    user_id?: number;
    ip_address?: string;
    details?: any;
}

export interface ISystemLogsApi {
    getAll(filters?: { level?: string; category?: string }): Promise<ApiResponse<SystemLog[]>>;
    getById(id: number): Promise<ApiResponse<SystemLog>>;
    create(log: Omit<SystemLog, 'id'>): Promise<ApiResponse<SystemLog>>;
    deleteOld(days: number): Promise<ApiResponse<{ deleted: number }>>;
}
