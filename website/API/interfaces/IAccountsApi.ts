/**
 * INTERFACE: IAccountsApi
 * Contract for Accounts API implementations
 */

import { ApiResponse } from '../config';

export interface Account {
    id: number;
    full_name: string;
    email: string;
    password_hash?: string;
    avatar_url?: string;
    role?: string;
    status?: number;
    username?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LoginResponse {
    user: Omit<Account, 'password_hash'>;
    token: string;
    expiresIn: number;
}

export interface IAccountsApi {
    /**
     * GET /accounts - Lấy danh sách accounts
     */
    getAll(params?: { role?: number; status?: number }): Promise<ApiResponse<Account[]>>;

    /**
     * GET /accounts/:id - Lấy user theo ID
     */
    getById(id: number): Promise<ApiResponse<any>>;

    /**
     * POST /accounts - Tạo user mới
     */
    create(data: Account): Promise<ApiResponse<Account>>;

    /**
     * PUT /accounts/:id - Cập nhật user
     */
    update(id: number, data: Partial<Account>): Promise<ApiResponse<Account>>;

    /**
     * DELETE /accounts/:id - Xóa user
     */
    delete(id: number): Promise<ApiResponse<null>>;

    /**
     * POST /accounts/login - Đăng nhập
     */
    login(emailOrUsername: string, password: string): Promise<ApiResponse<LoginResponse>>;

    /**
     * POST /accounts/register - Đăng ký
     */
    register(data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<any>>;

    /**
     * POST /email/verify - Gửi mã xác thực email
     */
    sendEmailVerifyCode(email: string): Promise<ApiResponse<any>>;

    /**
     * POST /accounts/exists - Kiểm tra email/username tồn tại
     */
    isExists(email: string, username: string): Promise<ApiResponse<any>>;

    /**
     * PUT /accounts/:id/profile - Cập nhật profile
     */
    updateProfile(userId: number, profileData: any): Promise<ApiResponse<any>>;

    /**
     * POST /accounts/forgot-password - Quên mật khẩu
     * Yêu cầu cả username và email để xác thực tài khoản
     */
    forgotPassword(username: string, email: string): Promise<ApiResponse<{ message: string }>>;

    /**
     * PUT /accounts/:id/change-password - Đổi mật khẩu
     */
    changePassword(userId: number, data: {
        old_password: string;
        new_password: string;
    }): Promise<ApiResponse<{ message: string }>>;
}
