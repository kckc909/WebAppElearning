/**
 * Accounts API Service (Tài khoản & Auth)
 */

import { USE_MOCK_API, simulateDelay, successResponse, errorResponse, ApiResponse, handleApiError } from './config';
import axiosInstance from './api';
import { ACCOUNTS, USER_PROFILES, validateLogin, ROLES } from '../mockData';

export interface Account {
    id?: number;
    full_name: string;
    email: string;
    password_hash?: string;
    avatar_url?: string;
    role?: number;
    status?: number;
    username?: string;
    created_at?: string;
    updated_at?: string;
}

class AccountsService {
    // GET /accounts - Lấy danh sách accounts
    async getAll(params?: { role?: number; status?: number }): Promise<ApiResponse<Account[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            let result = ACCOUNTS.map(({ password_hash, ...a }) => a);

            if (params?.role !== undefined) {
                result = result.filter(a => a.role === params.role);
            }
            if (params?.status !== undefined) {
                result = result.filter(a => a.status === params.status);
            }

            return successResponse(result as Account[]);
        }

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

    // GET /accounts/:id - Lấy user theo ID
    async getById(id: number): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const account = ACCOUNTS.find(a => a.id === id);
            if (!account) {
                return errorResponse('Account not found', null);
            }

            const { password_hash, ...accountWithoutPassword } = account;
            const profile = USER_PROFILES.find(p => p.user_id === id);

            return successResponse({
                ...accountWithoutPassword,
                profile
            });
        }

        try {
            const response = await axiosInstance.get(`/accounts/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch account');
        }
    }

    // POST /accounts - Tạo user mới
    async create(data: Account): Promise<ApiResponse<Account>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            // Check if email exists
            if (ACCOUNTS.find(a => a.email === data.email)) {
                return errorResponse('Email already exists');
            }
            if (data.username && ACCOUNTS.find(a => a.username === data.username)) {
                return errorResponse('Username already exists');
            }

            const newAccount = {
                id: ACCOUNTS.length + 1,
                ...data,
                role: data.role ?? ROLES.STUDENT,
                status: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            ACCOUNTS.push(newAccount as any);

            const { password_hash, ...result } = newAccount;
            return successResponse(result as Account, 'Account created successfully');
        }

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

    // PUT /accounts/:id - Cập nhật user
    async update(id: number, data: Partial<Account>): Promise<ApiResponse<Account>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const index = ACCOUNTS.findIndex(a => a.id === id);
            if (index === -1) {
                return errorResponse('Account not found');
            }

            ACCOUNTS[index] = {
                ...ACCOUNTS[index],
                ...data,
                updated_at: new Date().toISOString()
            };

            const { password_hash, ...result } = ACCOUNTS[index];
            return successResponse(result as Account, 'Account updated successfully');
        }

        try {
            const response = await axiosInstance.put(`/accounts/${id}`, data);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update account');
        }
    }

    // DELETE /accounts/:id - Xóa user
    async delete(id: number): Promise<ApiResponse<null>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const index = ACCOUNTS.findIndex(a => a.id === id);
            if (index === -1) {
                return errorResponse('Account not found');
            }
            ACCOUNTS.splice(index, 1);
            return successResponse(null, 'Account deleted successfully');
        }

        try {
            const response = await axiosInstance.delete(`/accounts/${id}`);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to delete account');
        }
    }

    // POST /accounts/login - Đăng nhập
    async login(emailOrUsername: string, password: string): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const user = validateLogin(emailOrUsername, password);
            if (!user) {
                return errorResponse('Invalid email or username or password', null);
            }

            // Generate fake token
            const token = `mock_token_${user.id}_${Date.now()}`;
            return successResponse({
                user,
                token,
                expiresIn: 86400 // 24 hours
            }, 'Login successful');
        }

        try {
            const response = await axiosInstance.post('/accounts/login', { emailOrUsername: emailOrUsername, password });
            if (!response.data) {
                return errorResponse('Sai tài khoản hoặc mật khẩu', null);
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
                return errorResponse('Sai tài khoản hoặc mật khẩu', null);
            }
            return errorResponse(apiError.message, null);
        }
    }

    // POST /accounts/register - Đăng ký
    async register(data: { name: string; username: string; email: string; password: string }): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            // Check if exists
            if (ACCOUNTS.find(a => a.email === data.email)) {
                return errorResponse('Email already exists');
            }
            if (ACCOUNTS.find(a => a.username === data.username)) {
                return errorResponse('Username already exists');
            }

            const newAccount = {
                id: ACCOUNTS.length + 1,
                full_name: data.name,
                email: data.email,
                password_hash: data.password,
                username: data.username,
                avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
                role: ROLES.STUDENT,
                status: 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            ACCOUNTS.push(newAccount);

            const { password_hash, ...result } = newAccount;
            return successResponse(result, 'Registration successful');
        }

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

    // POST /email/verify - Gửi mã xác thực email
    async sendEmailVerifyCode(email: string): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`Mock verify code for ${email}: ${code}`);
            return successResponse({ code }, 'Verification code sent');
        }

        try {
            const response = await axiosInstance.post('/email/vertify', { email });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to send verification code');
        }
    }

    // POST /accounts/exists - Kiểm tra email/username tồn tại
    async isExists(email: string, username: string): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay(100);
            const emailExists = ACCOUNTS.some(a => a.email === email);
            const usernameExists = ACCOUNTS.some(a => a.username === username);
            return successResponse({ emailExists, usernameExists });
        }

        try {
            const response = await axiosInstance.post('/accounts/exists', { email, username });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to check');
        }
    }

    // GET /accounts/instructors - Lấy danh sách instructors
    async getInstructors(): Promise<ApiResponse<any[]>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const instructors = ACCOUNTS.filter(a => a.role === ROLES.INSTRUCTOR).map(a => {
                const { password_hash, ...account } = a;
                const profile = USER_PROFILES.find(p => p.user_id === a.id);
                return { ...account, profile };
            });
            return successResponse(instructors);
        }

        try {
            const response = await axiosInstance.get('/accounts', { params: { role: ROLES.INSTRUCTOR } });
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to fetch instructors');
        }
    }

    // PUT /accounts/:id/profile - Cập nhật profile
    async updateProfile(userId: number, profileData: any): Promise<ApiResponse<any>> {
        if (USE_MOCK_API) {
            await simulateDelay();
            const profileIndex = USER_PROFILES.findIndex(p => p.user_id === userId);

            if (profileIndex >= 0) {
                USER_PROFILES[profileIndex] = { ...USER_PROFILES[profileIndex], ...profileData };
                return successResponse(USER_PROFILES[profileIndex], 'Profile updated');
            }

            const newProfile = {
                id: USER_PROFILES.length + 1,
                user_id: userId,
                ...profileData
            };
            USER_PROFILES.push(newProfile);
            return successResponse(newProfile, 'Profile created');
        }

        try {
            const response = await axiosInstance.put(`/accounts/${userId}/profile`, profileData);
            return successResponse(response.data);
        } catch (error: any) {
            return errorResponse(error.message || 'Failed to update profile');
        }
    }
}

export const accService = new AccountsService();