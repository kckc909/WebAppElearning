/**
 * Mock Admin Activities API Implementation
 */

import { IAdminActivitiesApi, AdminActivity } from '../../interfaces/IAdminActivitiesApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockAdminActivitiesApi implements IAdminActivitiesApi {
    async getAll(filters?: { type?: string; is_read?: boolean }): Promise<ApiResponse<AdminActivity[]>> {
        await simulateDelay();
        try {
            let activities = dataSource.getAdminActivities();
            
            if (filters?.type) {
                activities = activities.filter(a => a.type === filters.type);
            }
            if (filters?.is_read !== undefined) {
                activities = activities.filter(a => a.is_read === filters.is_read);
            }
            
            return successResponse(activities);
        } catch (error) {
            return errorResponse('Failed to fetch admin activities');
        }
    }

    async getRecent(limit: number = 10): Promise<ApiResponse<AdminActivity[]>> {
        await simulateDelay();
        try {
            const activities = dataSource.getAdminActivities()
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, limit);
            return successResponse(activities);
        } catch (error) {
            return errorResponse('Failed to fetch recent activities');
        }
    }

    async markAsRead(id: number): Promise<ApiResponse<void>> {
        await simulateDelay();
        try {
            dataSource.markAdminActivityAsRead(id);
            return successResponse(undefined);
        } catch (error) {
            return errorResponse('Failed to mark activity as read');
        }
    }

    async markAllAsRead(): Promise<ApiResponse<void>> {
        await simulateDelay();
        try {
            dataSource.markAllAdminActivitiesAsRead();
            return successResponse(undefined);
        } catch (error) {
            return errorResponse('Failed to mark all activities as read');
        }
    }
}
