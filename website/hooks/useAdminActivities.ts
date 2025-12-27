/**
 * Admin Activities Hooks
 */

import { useState, useEffect } from 'react';
import { adminActivitiesApi } from '../API';
import type { AdminActivity } from '../API/interfaces/IAdminActivitiesApi';

export function useAdminActivities(filters?: { type?: string; is_read?: boolean }) {
    const [data, setData] = useState<AdminActivity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await adminActivitiesApi.getAll(filters);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch activities');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters?.type, filters?.is_read]);

    return { data, loading, error, refetch: fetchData };
}

export function useRecentAdminActivities(limit: number = 10) {
    const [data, setData] = useState<AdminActivity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await adminActivitiesApi.getRecent(limit);
                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.error || 'Failed to fetch activities');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit]);

    return { data, loading, error };
}
