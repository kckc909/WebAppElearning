import React, { useState } from 'react';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { superadmin_routes } from '../../page_routes';

const SuperAdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Sử dụng demo users
            const { validateLogin } = await import('../../../demoUsers');
            const userData = validateLogin(email, password);

            if (userData && userData.role === -1) {
                login(userData);
                toast.success('Đăng nhập thành công!');
                navigate('/superadmin/' + superadmin_routes.dashboard);
            } else if (userData && userData.role !== -1) {
                toast.error('Bạn không có quyền Super Admin!');
            } else {
                toast.error('Email hoặc mật khẩu không đúng!');
            }
        } catch (error) {
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="superadmin@milearn.com"
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
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        <LogIn className="w-5 h-5" />
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Chỉ dành cho Super Administrator
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Demo: superadmin@milearn.com / admin123
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
