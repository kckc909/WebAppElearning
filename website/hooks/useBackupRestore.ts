/**
 * Backup & Restore Hooks
 */

import { useState, useEffect } from 'react';
import { backupRestoreApi } from '../API';
import type { Backup } from '../API/interfaces/IBackupRestoreApi';

export function useBackups() {
    const [data, setData] = useState<Backup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await backupRestoreApi.getAll();
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch backups');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData };
}

export function useCreateBackup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createBackup = async (type: 'full' | 'incremental' | 'differential') => {
        setLoading(true);
        setError(null);
        try {
            const result = await backupRestoreApi.create(type);
            return result;
        } catch (err) {
            setError('An error occurred');
            return { success: false, data: null, error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { createBackup, loading, error };
}

export function useRestoreBackup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const restoreBackup = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await backupRestoreApi.restore(id);
            return result;
        } catch (err) {
            setError('An error occurred');
            return { success: false, data: null, error: 'An error occurred' };
        } finally {
            setLoading(false);
        }
    };

    return { restoreBackup, loading, error };
}
