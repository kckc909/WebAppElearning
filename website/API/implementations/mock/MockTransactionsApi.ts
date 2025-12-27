/**
 * Mock Transactions API Implementation
 * Pure mock logic - no if-else statements
 */

import { ITransactionsApi } from '../../interfaces/ITransactionsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';

export class MockTransactionsApi implements ITransactionsApi {
    async getAll(params?: { user_id?: number; status?: number }): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const transactions = dataSource.getAllTransactions();
        let result = transactions.map((t: any) => ({
            ...t,
            course: dataSource.getCourseById(t.course_id),
            payment_method: dataSource.getAllPaymentMethods().find((p: any) => p.id === t.method_id)
        }));

        if (params?.user_id) {
            result = result.filter((t: any) => t.user_id === params.user_id);
        }
        if (params?.status !== undefined) {
            result = result.filter((t: any) => t.status === params.status);
        }

        return successResponse(result);
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const transaction = dataSource.getTransactionById(id);
        if (!transaction) {
            return errorResponse('Transaction not found', null);
        }

        return successResponse({
            ...transaction,
            course: dataSource.getCourseById(transaction.course_id),
            user: dataSource.getAccountById(transaction.user_id),
            payment_method: dataSource.getAllPaymentMethods().find((p: any) => p.id === transaction.method_id)
        });
    }

    async create(data: { user_id: number; course_id: number; amount: number; method_id: number }): Promise<ApiResponse<any>> {
        await simulateDelay();
        const transactions = dataSource.getAllTransactions() as any[];
        const newTransaction = {
            id: transactions.length + 1,
            ...data,
            transaction_code: `TXN${Date.now()}`,
            status: 1,
            created_at: new Date().toISOString()
        };
        transactions.push(newTransaction);

        // Auto-enroll user in course
        const existingEnrollment = dataSource.getAllCourseEnrollments().find(
            e => e.course_id === data.course_id && e.student_id === data.user_id
        );
        if (!existingEnrollment) {
            dataSource.getAllCourseEnrollments().push({
                id: dataSource.getAllCourseEnrollments().length + 1,
                course_id: data.course_id,
                student_id: data.user_id,
                enrolled_at: new Date().toISOString(),
                progress: 0,
                certificate_url: null,
                status: 1,
                last_lesson_id: null
            } as any);
        }

        return successResponse(newTransaction, 'Payment successful');
    }

    async getPaymentMethods(): Promise<ApiResponse<any[]>> {
        await simulateDelay();
        const activeMethods = dataSource.getActivePaymentMethods();
        return successResponse(activeMethods);
    }

    async verifyPayment(transactionCode: string): Promise<ApiResponse<any>> {
        await simulateDelay();
        const transactions = dataSource.getAllTransactions();
        const transaction = transactions.find((t: any) => t.transaction_code === transactionCode);
        if (!transaction) {
            return errorResponse('Transaction not found', null);
        }
        return successResponse({ ...transaction, verified: true }, 'Payment verified');
    }
}
