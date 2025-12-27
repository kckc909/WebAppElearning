/**
 * HOOKS: useAccounts
 * Custom hooks for Accounts API
 */

import { useState, useCallback } from 'react';
import { accService } from '../API';
import type { ApiResponse } from '../API';
import type { Account, LoginResponse } from '../API/interfaces/IAccountsApi';

/**
 * Hook for managing accounts list with CRUD operations
 * Used by: SuperAdmin/UsersManagement
 * 
 * Returns:
 * - accounts: Account[] - List of accounts
 * - loading: boolean - Loading state
 * - error: string | null - Error message
 * - fetchAccounts: (params?) => Promise<void> - Fetch accounts
 * - createAccount: (data) => Promise<ApiResponse> - Create new account
 * - updateAccount: (id, data) => Promise<ApiResponse> - Update account
 * - deleteAccount: (id) => Promise<ApiResponse> - Delete account (soft delete)
 */
export function useAccounts(params?: { role?: number; status?: number }) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all accounts
    const fetchAccounts = useCallback(async (fetchParams?: { role?: number; status?: number }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.getAll(fetchParams || params);
            if (response.success) {
                setAccounts(response.data);
            } else {
                setError(response.error || 'Failed to fetch accounts');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [params]);

    // Create account
    const createAccount = useCallback(async (data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.register(data);
            if (!response.success) {
                setError(response.error || 'Failed to create account');
                throw new Error(response.error);
            }
            return response;
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update account
    const updateAccount = useCallback(async (id: number, data: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.updateProfile(id, data);
            if (!response.success) {
                setError(response.error || 'Failed to update account');
                throw new Error(response.error);
            }
            return response;
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete account (hard delete - cascade delete all related data)
    const deleteAccount = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.delete(id);
            if (!response.success) {
                setError(response.error || 'Failed to delete account');
                throw new Error(response.error);
            }
            return response;
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        accounts,
        loading,
        error,
        fetchAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
    };
}

/**
 * Hook for getting account by ID
 * Simple read-only hook
 */
export function useAccountById(id: number) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.getById(id);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Failed to fetch account');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch: fetchAccount };
}

/**
 * Hook for login
 */
export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (emailOrUsername: string, password: string): Promise<ApiResponse<LoginResponse>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.login(emailOrUsername, password);
            if (!response.success) {
                setError(response.error || 'Login failed');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'An error occurred';
            setError(errorMsg);
            return {
                success: false,
                data: null as any,
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}

/**
 * Hook for register
 */
export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.register(data);
            if (!response.success) {
                setError(response.error || 'Registration failed');
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

    return { register, loading, error };
}

/**
 * Hook for email verification
 */
export function useEmailVerification() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendVerificationCode = async (email: string): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.sendEmailVerifyCode(email);
            if (!response.success) {
                setError(response.error || 'Failed to send verification code');
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

    return { sendVerificationCode, loading, error };
}

/**
 * Hook for checking if email/username exists
 */
export function useCheckExists() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const checkExists = async (email: string, username: string): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.isExists(email, username);
            if (!response.success) {
                setError(response.error || 'Failed to check');
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

    return { checkExists, loading, error };
}

/**
 * Hook for updating profile
 */
export function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (userId: number, profileData: any): Promise<ApiResponse<any>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.updateProfile(userId, profileData);
            if (!response.success) {
                setError(response.error || 'Failed to update profile');
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

    return { updateProfile, loading, error };
}

/**
 * Hook for forgot password
 * Requires both username and email to verify account existence
 */
export function useForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const forgotPassword = async (username: string, email: string): Promise<ApiResponse<{ message: string }>> => {
        setLoading(true);
        setError(null);
        try {
            const response = await accService.forgotPassword(username, email);
            if (!response.success) {
                setError(response.error || 'Không thể đặt lại mật khẩu');
            }
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'Đã xảy ra lỗi';
            setError(errorMsg);
            return {
                success: false,
                data: { message: '' },
                error: errorMsg
            };
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error };
}
