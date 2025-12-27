import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, XCircle, Loader2, User } from 'lucide-react';
import { useForgotPassword } from '../../hooks/useAccounts';
import { useEffect } from 'react';

// Toast Notification Component
const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onClose: () => void }> = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        info: <Mail className="w-5 h-5" />
    };

    const colors = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    React.useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${colors[type]} animate-slide-in`}>
            {icons[type]}
            <p className="text-sm font-medium">{message}</p>
            <button onClick={onClose} className="ml-2 hover:opacity-70">
                <XCircle className="w-4 h-4" />
            </button>
        </div>
    );
};

const REDIRECT_DELAY = 10;

const ForgotPasswordPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ username?: string; email?: string }>({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(REDIRECT_DELAY);

    const navigate = useNavigate();
    const { forgotPassword, loading: isLoading } = useForgotPassword();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = (): boolean => {
        const newErrors: { username?: string; email?: string } = {};

        if (!username.trim()) {
            newErrors.username = 'Tên tài khoản không được để trống';
        } else if (username.trim().length < 3) {
            newErrors.username = 'Tên tài khoản phải có ít nhất 3 ký tự';
        }

        if (!email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        const response = await forgotPassword(username.trim(), email.trim());

        if (response.success) {
            setIsSuccess(true);
            setRemainingTime(REDIRECT_DELAY);
            setToast({
                message: response.data.message || 'Mật khẩu mới đã được gửi đến email của bạn!',
                type: 'success'
            });
        } else {
            setToast({
                message: response.error || 'Đã xảy ra lỗi',
                type: 'error'
            });
        }
    };

    /** Countdown + redirect */
    useEffect(() => {
        if (!isSuccess) return;

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate('/auth');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isSuccess, navigate]);

    const inputClass = (hasError: boolean) =>
        `mt-1 block w-full rounded-lg border ${
            hasError
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:border-primary focus:ring-primary'
        } shadow-sm px-4 py-2.5 focus:ring-2 focus:outline-none transition-colors`;

    const isFormValid = username.trim().length >= 3 && emailRegex.test(email);
    const progressPercent = (remainingTime / REDIRECT_DELAY) * 100;

    /* ================= SUCCESS SCREEN ================= */
    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg m-4">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Thành công!</h2>

                        <p className="text-slate-600 mb-4">
                            Mật khẩu mới đã được gửi đến email{' '}
                            <span className="font-semibold">{email}</span>
                        </p>

                        <p className="text-sm text-slate-500 mb-6">
                            Vui lòng kiểm tra hộp thư đến (hoặc thư rác).
                        </p>

                        {/* Progress bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>Tự động chuyển sau {remainingTime}s</span>
                                <span>{Math.round(progressPercent)}%</span>
                            </div>

                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000 ease-linear"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>

                        <Link
                            to="/auth"
                            className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Quay lại đăng nhập ngay
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* ================= FORM SCREEN ================= */
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg m-4">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-secondary">MiLearn</span>
                    </Link>

                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-2xl font-bold text-secondary mb-2">Quên mật khẩu?</h2>
                    <p className="text-slate-500">
                        Nhập tên tài khoản và email của bạn để nhận mật khẩu mới.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Tên tài khoản <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErrors((prev) => ({ ...prev, username: undefined }));
                                }}
                                className={`${inputClass(!!errors.username)} pl-10`}
                                disabled={isLoading}
                                placeholder="Nhập tên tài khoản"
                            />
                        </div>
                        {errors.username && <p className="text-xs text-red-600 mt-1">{errors.username}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors((prev) => ({ ...prev, email: undefined }));
                                }}
                                className={`${inputClass(!!errors.email)} pl-10`}
                                disabled={isLoading}
                                placeholder="example@email.com"
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang xử lý...
                            </span>
                        ) : (
                            'Gửi mật khẩu mới'
                        )}
                    </button>

                    <div className="text-center">
                        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ForgotPasswordPage;
