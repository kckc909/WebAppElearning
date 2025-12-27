/**
 * Database Transactions API Implementation
 * Pure database logic - no if-else statements
 */

import { ITransactionsApi } from '../../interfaces/ITransactionsApi';
import { successResponse, errorResponse, ApiResponse } from '../../config';
import axiosInstance from '../../api';

export class DbTransactionsApi implements ITransactionsApi {
    async getAll(params?: { user_id?: number; status?: number }): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/transactions', { params });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch transactions');
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/transactions/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch transaction');
        }
    }

    async create(data: { user_id: number; course_id: number; amount: number; method_id: number }): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/transactions', data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Payment failed');
        }
    }

    async getPaymentMethods(): Promise<ApiResponse<any[]>> {
        try {
            const response = await axiosInstance.get('/payment-methods');
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch payment methods');
        }
    }

    async verifyPayment(transactionCode: string): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/transactions/verify', { transaction_code: transactionCode });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Verification failed');
        }
    }
}
