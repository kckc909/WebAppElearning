/**
 * Payouts Hook (Admin - Instructor Payments)
 */

import { useState, useEffect } from 'react';
import { transactionsApi } from '../API';

export function usePayouts(filters?: { instructor_id?: number; status?: string }) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Get transactions and filter for payouts
            const result = await transactionsApi.getAll(filters);
            if (result.success) {
                // Filter for payout transactions (negative amounts = payouts to instructors)
                const payouts = result.data.filter((t: any) => t.type === 'payout' || t.amount < 0);
                setData(payouts);
            } else {
                setError(result.error || 'Failed to fetch payouts');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters?.instructor_id, filters?.status]);

    return { data, loading, error, refetch: fetchData };
}

export function useCreatePayout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPayout = async (instructorId: number, amount: number) => {
        setLoading(true);
        setError(null);
        try {
            // Create payout transaction
            const result = await transactionsApi.create({
                user_id: instructorId,
                amount: -amount, // Negative for payout
                type: 'payout',
                status: 'pending'
            } as any);
            return result;
        } catch (err) {
            setError('An error occurred');
            return { success: false, data: null, error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { createPayout, loading, error };
}
