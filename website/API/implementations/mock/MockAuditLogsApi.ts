/**
 * Mock Audit Logs API Implementation
 */

import { IAuditLogsApi, AuditLog } from '../../interfaces/IAuditLogsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockAuditLogsApi implements IAuditLogsApi {
    async getAll(filters?: { user_id?: number; action?: string; status?: string }): Promise<ApiResponse<AuditLog[]>> {
        await simulateDelay();
        try {
            let logs = dataSource.getAuditLogs();
            
            if (filters?.user_id) {
                logs = logs.filter(log => log.user_id === filters.user_id);
            }
            if (filters?.action) {
                logs = logs.filter(log => log.action.includes(filters.action));
            }
            if (filters?.status) {
                logs = logs.filter(log => log.status === filters.status);
            }
            
            return successResponse(logs);
        } catch (error) {
            return errorResponse('Failed to fetch audit logs');
        }
    }

    async getById(id: number): Promise<ApiResponse<AuditLog>> {
        await simulateDelay();
        try {
            const log = dataSource.getAuditLogById(id);
            if (!log) {
                return errorResponse('Audit log not found');
            }
            return successResponse(log);
        } catch (error) {
            return errorResponse('Failed to fetch audit log');
        }
    }

    async getByUser(userId: number): Promise<ApiResponse<AuditLog[]>> {
        await simulateDelay();
        try {
            const logs = dataSource.getAuditLogsByUser(userId);
            return successResponse(logs);
        } catch (error) {
            return errorResponse('Failed to fetch user audit logs');
        }
    }

    async getByResource(resourceType: string, resourceId: number): Promise<ApiResponse<AuditLog[]>> {
        await simulateDelay();
        try {
            const logs = dataSource.getAuditLogsByResource(resourceType, resourceId);
            return successResponse(logs);
        } catch (error) {
            return errorResponse('Failed to fetch resource audit logs');
        }
    }
}
