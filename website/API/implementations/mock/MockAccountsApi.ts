/**
 * MOCK IMPLEMENTATION: AccountsApi
 * Pure mock logic - NO if-else, NO database calls
 */

import { IAccountsApi, Account, LoginResponse } from '../../interfaces/IAccountsApi';
import { simulateDelay, successResponse, errorResponse, ApiResponse } from '../../config';
import { dataSource } from '../../../data/datasources/datasource.router';
import { UserRole } from '../../../mock-db/enums.mock';

export class MockAccountsApi implements IAccountsApi {
    async getAll(params?: { role?: number; status?: number }): Promise<ApiResponse<Account[]>> {
        await simulateDelay();
        const accounts = dataSource.getAllAccounts();
        let result = accounts.map(({ password_hash, ...a }) => a);

        if (params?.role !== undefined) {
            result = result.filter(a => a.role === params.role);
        }
        if (params?.status !== undefined) {
            result = result.filter(a => a.status === params.status);
        }

        return successResponse(result as Account[]);
    }

    async getById(id: number): Promise<ApiResponse<any>> {
        await simulateDelay();
        const account = dataSource.getAccountById(id);
        if (!account) {
            return errorResponse('Account not found', null);
        }

        const { password_hash, ...accountWithoutPassword } = account;
        const profile = dataSource.getProfileByUserId(id);

        return successResponse({
            ...accountWithoutPassword,
            profile
        });
    }

    async create(data: Account): Promise<ApiResponse<Account>> {
        await simulateDelay();
        // Check if email exists
        const accounts = dataSource.getAllAccounts();
        if (accounts.find(a => a.email === data.email)) {
            return errorResponse('Email already exists');
        }
        if (data.username && accounts.find(a => a.username === data.username)) {
            return errorResponse('Username already exists');
        }

        const newAccount = {
            id: accounts.length + 1,
            ...data,
            role: data.role ?? UserRole.STUDENT,
            status: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        // Note: In real implementation, datasource.createAccount() should handle this
        const mockAccounts = accounts as any[];
        mockAccounts.push(newAccount as any);

        const { password_hash, ...result } = newAccount;
        return successResponse(result as Account, 'Account created successfully');
    }

    async update(id: number, data: Partial<Account>): Promise<ApiResponse<Account>> {
        await simulateDelay();
        const accounts = dataSource.getAllAccounts() as any[];
        const index = accounts.findIndex(a => a.id === id);
        if (index === -1) {
            return errorResponse('Account not found');
        }

        accounts[index] = {
            ...accounts[index],
            ...data,
            updated_at: new Date().toISOString()
        };

        const { password_hash, ...result } = accounts[index];
        return successResponse(result as Account, 'Account updated successfully');
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        await simulateDelay();
        const accounts = dataSource.getAllAccounts() as any[];
        const index = accounts.findIndex(a => a.id === id);
        if (index === -1) {
            return errorResponse('Account not found');
        }
        accounts.splice(index, 1);
        return successResponse(null, 'Account deleted successfully');
    }

    async login(emailOrUsername: string, password: string): Promise<ApiResponse<LoginResponse>> {
        await simulateDelay();

        // Validate login using datasource
        const accounts = dataSource.getAllAccounts();
        const user = accounts.find(a =>
            (a.email === emailOrUsername || a.username === emailOrUsername) &&
            a.password_hash === password
        );

        if (!user) {
            return errorResponse('Invalid email or username or password', null as any);
        }

        // Remove password from response
        const { password_hash, ...userWithoutPassword } = user;

        // Generate fake token
        const token = `mock_token_${user.id}_${Date.now()}`;
        return successResponse({
            user: userWithoutPassword,
            token,
            expiresIn: 86400 // 24 hours
        }, 'Login successful');
    }

    async register(data: {
        name: string;
        username: string;
        email: string;
        password: string;
    }): Promise<ApiResponse<any>> {
        await simulateDelay();

        // Check if exists using datasource
        const accounts = dataSource.getAllAccounts();
        if (accounts.find(a => a.email === data.email)) {
            return errorResponse('Email already exists');
        }
        if (accounts.find(a => a.username === data.username)) {
            return errorResponse('Username already exists');
        }

        const newAccount = {
            id: accounts.length + 1,
            full_name: data.name,
            email: data.email,
            password_hash: data.password,
            username: data.username,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
            role: UserRole.STUDENT,
            status: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const mockAccounts = dataSource.getAllAccounts() as any[];
        mockAccounts.push(newAccount);

        const { password_hash, ...result } = newAccount;

        // Generate token for auto-login after registration
        const token = `mock_token_${newAccount.id}_${Date.now()}`;

        return successResponse({
            user: result,
            token,
            expiresIn: 86400 // 24 hours
        }, 'Registration successful');
    }

    async sendEmailVerifyCode(email: string): Promise<ApiResponse<any>> {
        await simulateDelay();
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`Mock verify code for ${email}: ${code}`);
        return successResponse({ code }, 'Verification code sent');
    }

    async isExists(email: string, username: string): Promise<ApiResponse<any>> {
        await simulateDelay(100);
        const accounts = dataSource.getAllAccounts();
        const emailExists = accounts.some(a => a.email === email);
        const usernameExists = accounts.some(a => a.username === username);
        return successResponse({ emailExists, usernameExists });
    }

    async updateProfile(userId: number, profileData: any): Promise<ApiResponse<any>> {
        await simulateDelay();

        // Check if profile exists using datasource
        const existingProfile = dataSource.getProfileByUserId(userId);

        if (existingProfile) {
            // Update existing profile
            const updatedProfile = { ...existingProfile, ...profileData };
            return successResponse(updatedProfile, 'Profile updated');
        }

        // Create new profile
        const newProfile = {
            id: Date.now(),
            user_id: userId,
            ...profileData
        };
        return successResponse(newProfile, 'Profile created');
    }

    async forgotPassword(username: string, email: string): Promise<ApiResponse<{ message: string }>> {
        await simulateDelay();

        // Find account with matching username AND email
        const accounts = dataSource.getAllAccounts();
        const account = accounts.find(a =>
            a.username === username && a.email === email
        );

        if (!account) {
            return errorResponse('Không tìm thấy tài khoản với thông tin đã cung cấp. Vui lòng kiểm tra lại username và email.', { message: '' });
        }

        // Simulate sending new password to email
        const newPassword = Math.random().toString(36).slice(-8);
        console.log(`[Mock] New password for ${email}: ${newPassword}`);

        return successResponse(
            { message: 'Mật khẩu mới đã được gửi đến email của bạn!' },
            'Password reset successful'
        );
    }

    async changePassword(userId: number, data: {
        old_password: string;
        new_password: string;
    }): Promise<ApiResponse<{ message: string }>> {
        await simulateDelay();

        // Find account
        const accounts = dataSource.getAllAccounts();
        const account = accounts.find(a => a.id === userId);

        if (!account) {
            return errorResponse('Không tìm thấy tài khoản', { message: '' });
        }

        // Check old password
        if (account.password_hash !== data.old_password) {
            return errorResponse('Mật khẩu hiện tại không đúng', { message: '' });
        }

        // Update password (in mock, this would update the datasource)
        console.log(`[Mock] Password changed for user ${userId}`);

        return successResponse(
            { message: 'Đổi mật khẩu thành công!' },
            'Password changed successfully'
        );
    }
}
