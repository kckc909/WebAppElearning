/**
 * INTERFACE: ITransactionsApi
 * Contract for Transactions API implementations
 */

import { ApiResponse } from '../config';

export interface ITransactionsApi {
    /**
     * GET /transactions - Lấy lịch sử giao dịch
     */
    getAll(params?: { user_id?: number; status?: number }): Promise<ApiResponse<any[]>>;

    /**
     * GET /transactions/:id - Chi tiết giao dịch
     */
    getById(id: number): Promise<ApiResponse<any>>;

    /**
     * POST /transactions - Tạo giao dịch mới (checkout)
     */
    create(data: {
        user_id: number;
        course_id: number;
        amount: number;
        method_id: number;
    }): Promise<ApiResponse<any>>;

    /**
     * GET /payment-methods - Lấy danh sách phương thức thanh toán
     */
    getPaymentMethods(): Promise<ApiResponse<any[]>>;

    /**
     * POST /transactions/verify - Verify payment (for QR/bank transfer)
     */
    verifyPayment(transactionCode: string): Promise<ApiResponse<any>>;
}
