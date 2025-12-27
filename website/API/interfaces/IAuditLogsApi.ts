/**
 * Audit Logs API Interface
 */

import { ApiResponse } from '../config';

export interface AuditLog {
    id: number;
    timestamp: string;
    user_id: number;
    user_name: string;
    action: string;
    resource_type: string;
    resource_id: number;
    changes?: any;
    ip_address?: string;
    status: 'success' | 'failed' | 'pending';
}

export interface IAuditLogsApi {
    getAll(filters?: { user_id?: number; action?: string; status?: string }): Promise<ApiResponse<AuditLog[]>>;
    getById(id: number): Promise<ApiResponse<AuditLog>>;
    getByUser(userId: number): Promise<ApiResponse<AuditLog[]>>;
    getByResource(resourceType: string, resourceId: number): Promise<ApiResponse<AuditLog[]>>;
}
