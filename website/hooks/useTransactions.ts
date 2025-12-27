/**
 * HOOKS: useTransactions
 * Custom hooks for Transactions API
 */

import { useState } from 'react';
import { transactionsApi } from '../API';
import type { ApiResponse } from '../API';

/**
 * Hook for getting all transactions
 */
export function useTransactions(params?: { user_id?: number; status?: number }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsApi.getAll(params);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch transactions');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchTransactions };
}

/**
 * Hook for getting transaction by ID
 */
export function useTransaction(id: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransaction = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsApi.getById(id);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch transaction');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchTransaction };
}

/**
 * Hook for creating transaction (payment)
 */
export function useCreateTransaction() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTransaction = async (data: {
        user_id: number;
        course_id: number;
        amount: number;
        method_id: number;
    }): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsApi.create(data);
            if (!response.success) {
                setError(response.error || 'Payment failed');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { createTransaction, loading, error };
}

/**
 * Hook for getting payment methods
 */
export function usePaymentMethods() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPaymentMethods = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsApi.getPaymentMethods();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch payment methods');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchPaymentMethods };
}

/**
 * Hook for verifying payment
 */
export function useVerifyPayment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyPayment = async (transactionCode: string): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await transactionsApi.verifyPayment(transactionCode);
            if (!response.success) {
                setError(response.error || 'Verification failed');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { verifyPayment, loading, error };
}
