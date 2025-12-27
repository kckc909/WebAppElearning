/**
 * Mock System Logs API Implementation
 */

import { ISystemLogsApi, SystemLog } from '../../interfaces/ISystemLogsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockSystemLogsApi implements ISystemLogsApi {
    async getAll(filters?: { level?: string; category?: string }): Promise<ApiResponse<SystemLog[]>> {
        await simulateDelay();
        try {
            let logs = dataSource.getSystemLogs();
            
            if (filters?.level) {
                logs = logs.filter(log => log.level === filters.level);
            }
            if (filters?.category) {
                logs = logs.filter(log => log.category === filters.category);
            }
            
            return successResponse(logs);
        } catch (error) {
            return errorResponse('Failed to fetch system logs');
        }
    }

    async getById(id: number): Promise<ApiResponse<SystemLog>> {
        await simulateDelay();
        try {
            const log = dataSource.getSystemLogById(id);
            if (!log) {
                return errorResponse('System log not found');
            }
            return successResponse(log);
        } catch (error) {
            return errorResponse('Failed to fetch system log');
        }
    }

    async create(log: Omit<SystemLog, 'id'>): Promise<ApiResponse<SystemLog>> {
        await simulateDelay();
        try {
            const newLog = dataSource.createSystemLog(log);
            return successResponse(newLog);
        } catch (error) {
            return errorResponse('Failed to create system log');
        }
    }

    async deleteOld(days: number): Promise<ApiResponse<{ deleted: number }>> {
        await simulateDelay();
        try {
            const deleted = dataSource.deleteOldSystemLogs(days);
            return successResponse({ deleted });
        } catch (error) {
            return errorResponse('Failed to delete old logs');
        }
    }
}
