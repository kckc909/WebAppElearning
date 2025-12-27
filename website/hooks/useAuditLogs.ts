/**
 * Audit Logs Hooks
 */

import { useState, useEffect } from 'react';
import { auditLogsApi } from '../API';
import type { AuditLog } from '../API/interfaces/IAuditLogsApi';

export function useAuditLogs(filters?: { user_id?: number; action?: string; status?: string }) {
    const [data, setData] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await auditLogsApi.getAll(filters);
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch audit logs');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filters?.user_id, filters?.action, filters?.status]);

    return { data, loading, error, refetch: fetchData };
}

export function useAuditLog(id: number) {
    const [data, setData] = useState<AuditLog | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await auditLogsApi.getById(id);
                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.error || 'Failed to fetch audit log');
                }
            } catch (err) {
                setError('An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    return { data, loading, error };
}
