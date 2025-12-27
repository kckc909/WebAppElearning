/**
 * DATABASE IMPLEMENTATION: AccountsApi
 * Pure database logic - NO if-else, NO mock data
 */

import { IAccountsApi, Account, LoginResponse } from '../../interfaces/IAccountsApi';
import { successResponse, errorResponse, ApiResponse, handleApiError } from '../../config';
import axiosInstance from '../../api';

export class DbAccountsApi implements IAccountsApi {
    async getAll(params?: { role?: number; status?: number }): Promise<ApiResponse<Account[]>> {
        try {
            const response = await axiosInstance.get('/accounts', { params });
            const data = response.data || [];
            return successResponse(Array.isArray(data) ? data : []);
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Accounts API] getAll error:', apiError);
            return errorResponse(apiError.message, []);
        }
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get(`/accounts/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch account');
        }
    }

    async create(data: Account): Promise<ApiResponse<Account>> {
        try {
            const response = await axiosInstance.post('/accounts', data);
            return successResponse(response.data, 'Tạo tài khoản thành công');
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Accounts API] create error:', apiError);
            // Xử lý lỗi duplicate
            if (error.response?.data?.message?.includes('email') || error.response?.data?.message?.includes('Email')) {
                return errorResponse('Email đã được sử dụng');
            }
            if (error.response?.data?.message?.includes('username') || error.response?.data?.message?.includes('Username')) {
                return errorResponse('Username đã được sử dụng');
            }
            return errorResponse(apiError.message);
        }
    }

    async update(id: number, data: Partial<Account>): Promise<ApiResponse<Account>> {
        try {
            const response = await axiosInstance.put(`/accounts/${id}`, data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update account');
        }
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        try {
            const response = await axiosInstance.delete(`/accounts/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to delete account');
        }
    }

    async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await axiosInstance.post('/accounts/login', {
                username,
                password
            });
            if (!response.data) {
                return errorResponse('Sai tài khoản hoặc mật khẩu', null as any);
            }
            // Backend trả về user trực tiếp, wrap lại cho consistent
            return successResponse({
                user: response.data,
                token: `db_token_${response.data.id}_${Date.now()}`,
                expiresIn: 86400
            }, 'Login successful');
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Accounts API] login error:', apiError);
            // Xử lý lỗi 401 đặc biệt
            if (error.response?.status === 401) {
                return errorResponse('Sai tài khoản hoặc mật khẩu', null as any);
            }
            return errorResponse(apiError.message, null as any);
        }
    }

    async register(data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/accounts', {
                full_name: data.name,
                username: data.username,
                email: data.email,
                password_hash: data.password
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Registration failed');
        }
    }

    async sendEmailVerifyCode(email: string): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/email/vertify', { email });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to send verification code');
        }
    }

    async isExists(email: string, username: string): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.post('/accounts/exists', { email, username });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to check');
        }
    }

    async updateProfile(userId: number, profileData: any): Promise<ApiResponse<any>> {
        try {
            // Backend sử dụng PUT /accounts/:id để cập nhật profile (không có route /profile riêng)
            const response = await axiosInstance.put(`/accounts/${userId}`, {
                id: userId,
                ...profileData
            });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update profile');
        }
    }

    async forgotPassword(username: string, email: string): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await axiosInstance.post('/accounts/forgot-password', {
                username: username.trim(),
                email: email.trim()
            });

            if (response.data?.success === false) {
                return errorResponse(response.data.message || 'Không tìm thấy tài khoản', { message: '' });
            }

            return successResponse(
                { message: response.data?.message || 'Mật khẩu mới đã được gửi đến email của bạn!' },
                'Password reset successful'
            );
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Accounts API] forgotPassword error:', apiError);

            // Handle 404 - account not found
            if (error.response?.status === 404) {
                return errorResponse('Không tìm thấy tài khoản với thông tin đã cung cấp. Vui lòng kiểm tra lại username và email.', { message: '' });
            }

            return errorResponse(apiError.message, { message: '' });
        }
    }

    async changePassword(userId: number, data: {
        old_password: string;
        new_password: string;
    }): Promise<ApiResponse<{ message: string }>> {
        try {
            const response = await axiosInstance.put(`/accounts/${userId}/change-password`, data);
            return successResponse(
                { message: response.data?.message || 'Đổi mật khẩu thành công!' },
                'Password changed successfully'
            );
        } catch (error: any) {
            const apiError = handleApiError(error);
            console.error('[Accounts API] changePassword error:', apiError);

            // Handle 400/401 - wrong password
            if (error.response?.status === 400 || error.response?.status === 401) {
                return errorResponse('Mật khẩu hiện tại không đúng', { message: '' });
            }

            return errorResponse(apiError.message || 'Không thể đổi mật khẩu', { message: '' });
        }
    }
}
