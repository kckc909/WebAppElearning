/**
 * Revenue & Analytics Hooks
 */

import { useState, useEffect } from 'react';
import { revenueApi } from '../API';
import type { RevenueData, CategoryRevenue } from '../API/interfaces/IRevenueApi';

export function useRevenue(timeRange: 'day' | 'week' | 'month' | 'year') {
    const [data, setData] = useState<RevenueData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await revenueApi.getRevenue(timeRange);
                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.error || 'Failed to fetch revenue');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    return { data, loading, error };
}

export function useCategoryRevenue(timeRange: 'month' | 'year') {
    const [data, setData] = useState<CategoryRevenue[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await revenueApi.getByCategory(timeRange);
                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.error || 'Failed to fetch category revenue');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [timeRange]);

    return { data, loading, error };
}
