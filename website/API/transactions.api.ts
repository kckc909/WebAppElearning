/**
 * Transactions API Service (Thanh toán)
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse } from './config';
import axiosInstance from './api';
import {
    TRANSACTIONS,
    PAYMENT_METHODS,
    COURSES,
    ACCOUNTS,
    COURSE_ENROLLMENTS,
} from '../mockData';

class TransactionsApiService {
    // GET /transactions - Lấy lịch sử giao dịch
    async getAll(params?: { user_id?: number; status?: number }): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            let result = TRANSACTIONS.map(t => ({
                ...t,
                course: COURSES.find((c: any) => c.id === t.course_id),
                payment_method: PAYMENT_METHODS.find(p => p.id === t.method_id)
            }));

            if (params?.user_id) {
                result = result.filter(t => t.user_id === params.user_id);
            }
            if (params?.status !== undefined) {
                result = result.filter(t => t.status === params.status);
            }

            return successResponse(result);
        }

        try {
            const response = await axiosInstance.get('/transactions', { params });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch transactions');
        }
    }

    // GET /transactions/:id - Chi tiết giao dịch
    async getById(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const transaction = TRANSACTIONS.find(t => t.id === id);
            if (!transaction) {
                return errorResponse('Transaction not found', null);
            }

            return successResponse({
                ...transaction,
                course: COURSES.find((c: any) => c.id === transaction.course_id),
                user: ACCOUNTS.find(a => a.id === transaction.user_id),
                payment_method: PAYMENT_METHODS.find(p => p.id === transaction.method_id)
            });
        }

        try {
            const response = await axiosInstance.get(`/transactions/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch transaction');
        }
    }

    // POST /transactions - Tạo giao dịch mới (checkout)
    async create(data: { user_id: number; course_id: number; amount: number; method_id: number }): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const newTransaction = {
                id: TRANSACTIONS.length + 1,
                ...data,
                transaction_code: `TXN${Date.now()}`,
                status: 1, // Success
                created_at: new Date().toISOString()
            };
            TRANSACTIONS.push(newTransaction);

            // Auto-enroll user in course
            const existingEnrollment = COURSE_ENROLLMENTS.find(
                e => e.course_id === data.course_id && e.student_id === data.user_id
            );
            if (!existingEnrollment) {
                COURSE_ENROLLMENTS.push({
                    id: COURSE_ENROLLMENTS.length + 1,
                    course_id: data.course_id,
                    student_id: data.user_id,
                    enrolled_at: new Date().toISOString(),
                    progress: 0,
                    certificate_url: null,
                    status: 1
                });
            }

            return successResponse(newTransaction, 'Payment successful');
        }

        try {
            const response = await axiosInstance.post('/transactions', data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Payment failed');
        }
    }

    // GET /payment-methods - Lấy danh sách phương thức thanh toán
    async getPaymentMethods(): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const activeMethods = PAYMENT_METHODS.filter(m => m.is_active);
            return successResponse(activeMethods);
        }

        try {
            const response = await axiosInstance.get('/payment-methods');
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch payment methods');
        }
    }

    // POST /transactions/verify - Verify payment (for QR/bank transfer)
    async verifyPayment(transactionCode: string): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const transaction = TRANSACTIONS.find(t => t.transaction_code === transactionCode);
            if (!transaction) {
                return errorResponse('Transaction not found', null);
            }
            return successResponse({ ...transaction, verified: true }, 'Payment verified');
        }

        try {
            const response = await axiosInstance.post('/transactions/verify', { transaction_code: transactionCode });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Verification failed');
        }
    }
}

export const transactionsApi = new TransactionsApiService();
