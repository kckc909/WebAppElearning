/**
 * Mock Revenue API Implementation
 */

import { IRevenueApi, RevenueData, CategoryRevenue } from '../../interfaces/IRevenueApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockRevenueApi implements IRevenueApi {
    async getRevenue(timeRange: 'day' | 'week' | 'month' | 'year'): Promise<ApiResponse<RevenueData[]>> {
        await simulateDelay();
        try {
            const revenue = dataSource.getRevenueData(timeRange);
            return successResponse(revenue);
        } catch (error) {
            return errorResponse('Failed to fetch revenue data');
        }
    }

    async getByCategory(timeRange: 'month' | 'year'): Promise<ApiResponse<CategoryRevenue[]>> {
        await simulateDelay();
        try {
            const categoryRevenue = dataSource.getRevenueByCategoryData(timeRange);
            return successResponse(categoryRevenue);
        } catch (error) {
            return errorResponse('Failed to fetch category revenue');
        }
    }

    async getTotal(startDate?: string, endDate?: string): Promise<ApiResponse<{ total: number }>> {
        await simulateDelay();
        try {
            const total = dataSource.getTotalRevenue(startDate, endDate);
            return successResponse({ total });
        } catch (error) {
            return errorResponse('Failed to fetch total revenue');
        }
    }
}
