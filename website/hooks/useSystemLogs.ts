/**
 * System Logs Hooks
 */

import { useState, useEffect } from 'react';
import { systemLogsApi } from '../API';
import type { SystemLog } from '../API/interfaces/ISystemLogsApi';

export function useSystemLogs(filters?: { level?: string; category?: string }) {
    const [data, setData] = useState<SystemLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await systemLogsApi.getAll(filters);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch system logs');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters?.level, filters?.category]);

    return { data, loading, error, refetch: fetchData };
}
