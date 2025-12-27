import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { superadmin_routes } from '../../page_routes';
import { accService } from '../../../API';
import { UserRole } from '../../../mock-db/enums.mock';

const SuperAdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Use API service for login
            const response = await accService.login(username, password);

            if (!response.success || !response.data) {
                toast.error('Tài khoản hoặc mật khẩu không đúng!');
                setIsLoading(false);
                return;
            }

            const loginData = response.data;
            const userData = loginData.user || loginData;

            // Check if user has Super Admin role
            if (userData.role !== UserRole.SUPER_ADMIN) {
                toast.error('Bạn không có quyền Super Admin!');
                setIsLoading(false);
                return;
            }

            // Login successful
            login(userData as any);

            // Save token if available
            if (loginData.token) {
                sessionStorage.setItem("Token", loginData.token);
            }

            toast.success(`Chào mừng ${userData.full_name || 'Super Admin'}!`);
            navigate('/superadmin/' + superadmin_routes.dashboard);

        } catch (error) {
            console.error('Login error:', error);
            toast.error('Có lỗi xảy ra khi đăng nhập!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin</h1>
                    <p className="text-gray-600">Đăng nhập vào hệ thống quản trị</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="superadmin"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="••••••••"
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang đăng nhập...
                            </>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                Đăng nhập
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SuperAdminLogin;

