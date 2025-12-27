/**
 * Revenue & Analytics API Interface
 */

import { ApiResponse } from '../config';

export interface RevenueData {
    period: string;
    revenue: number;
    courses_sold: number;
    classes_sold: number;
    transactions: number;
}

export interface CategoryRevenue {
    category_id: number;
    category_name: string;
    revenue: number;
    percentage: number;
}

export interface IRevenueApi {
    getRevenue(timeRange: 'day' | 'week' | 'month' | 'year'): Promise<ApiResponse<RevenueData[]>>;
    getByCategory(timeRange: 'month' | 'year'): Promise<ApiResponse<CategoryRevenue[]>>;
    getTotal(startDate?: string, endDate?: string): Promise<ApiResponse<{ total: number }>>;
}
