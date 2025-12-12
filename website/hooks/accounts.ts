// hooks/useAccounts.ts
import { useState, useEffect } from 'react';
import { accService } from '../api/accounts.api';
import { Account } from '../types/types';

export interface UseAccountsOptions {
    autoFetch?: boolean; // Tự động fetch khi mount
}

export const useAccounts = (options: UseAccountsOptions = { autoFetch: true }) => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch tất cả accounts
    const fetchAccounts = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await accService.getAll();
            console.log(data)
            setAccounts(data);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi tải danh sách accounts');
        } finally {
            setLoading(false);
        }
    };

    // Fetch account theo ID
    const fetchAccountById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await accService.getById(id);
            return data;
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi tải account');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Tạo account mới
    const createAccount = async (data: Account) => {
        setLoading(true);
        setError(null);
        try {
            const newAccount = await accService.create(data);
            setAccounts(prev => [...prev, newAccount]);
            return newAccount;
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi tạo account');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật account
    const updateAccount = async (id: number, data: Account) => {
        setLoading(true);
        setError(null);
        try {
            const updatedAccount = await accService.update(id, data);
            setAccounts(prev => prev.map(acc => acc.id === id ? updatedAccount : acc));
            return updatedAccount;
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi cập nhật account');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Xóa account
    const deleteAccount = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await accService.delete(id);
            setAccounts(prev => prev.filter(acc => acc.id !== id));
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra khi xóa account');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Auto fetch khi component mount (nếu autoFetch = true)
    useEffect(() => {
        if (options.autoFetch) {
            fetchAccounts();
        }
    }, []);

    return {
        accounts,
        loading,
        error,
        fetchAccounts,
        fetchAccountById,
        createAccount,
        updateAccount,
        deleteAccount,
        refetch: fetchAccounts, // Alias cho fetchAccounts
    };
};