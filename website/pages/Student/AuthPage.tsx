import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { accService } from '../../API';
import SocialButton from '../../components/SocialButton';
import { useAuth } from '../../contexts/AuthContext';

// Toast Notification Component
const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info'; onClose: () => void }> = ({ message, type, onClose }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        info: <AlertCircle className="w-5 h-5" />
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

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Trim values
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Validation
        if (!trimmedUsername) {
            setError("Tài khoản không thể để trống!");
            return;
        }

        if (!trimmedPassword) {
            setError("Mật khẩu không thể để trống!");
            return;
        }

        // Validate không có space trong password
        if (trimmedPassword.includes(' ')) {
            setError("Mật khẩu không được chứa khoảng trắng!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await accService.login(trimmedUsername, trimmedPassword);

            if (!response.success || !response.data) {
                setError(response.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
                setIsLoading(false);
                return;
            }

            const loginData = response.data;
            const userData = loginData.user || loginData; // Support cả 2 format

            // Use AuthContext login to update state AND localStorage
            login(userData as any);

            if (loginData.token) {
                sessionStorage.setItem("Token", loginData.token);
            }

            // Show success toast
            setToast({ message: `Chào mừng ${userData.full_name}!`, type: 'success' });

            // Navigate after short delay
            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            setIsLoading(false);
        }
    };

    const inputClass = (hasError: boolean) =>
        `mt-1 block w-full rounded-lg border ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-primary focus:ring-primary'} shadow-sm px-4 py-2.5 focus:ring-2 focus:outline-none transition-colors`;

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Tên đăng nhập <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(''); }}
                        className={inputClass(!!error && !username.trim())}
                        placeholder="Nhập tên đăng nhập"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Mật khẩu <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            className={inputClass(!!error && !password.trim())}
                            placeholder="Nhập mật khẩu"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            disabled={isLoading}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                        <span className="text-slate-600">Ghi nhớ đăng nhập</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary hover:text-primary-hover font-medium">
                        Quên mật khẩu?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Đang đăng nhập...
                        </>
                    ) : (
                        'Đăng nhập'
                    )}
                </button>
            </form>
        </>
    );
};

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState<'form' | 'otp'>('form');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const [otp, setOtp] = useState('');
    const [otpErrorCount, setOtpErrorCount] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password strength calculator
    const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
        let strength = 0;
        if (pwd.length >= 6) strength++;
        if (pwd.length >= 10) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z\d]/.test(pwd)) strength++;

        const labels = ['Rất yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

        return { strength, label: labels[strength] || 'Rất yếu', color: colors[strength] || 'bg-red-500' };
    };

    const passwordStrength = getPasswordStrength(password);

    // Resend OTP timer
    React.useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const verifyOtp = async (otpCode: string) => {
        // TODO: Call API to verify OTP
        return otpCode === otp;
    };

    const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Trim values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Validation
        if (!trimmedName) return setError("Họ tên không được để trống.");
        if (!emailRegex.test(trimmedEmail)) return setError("Email không hợp lệ.");
        if (trimmedUsername.length < 4) return setError("Tài khoản phải ít nhất 4 ký tự.");
        if (/\s/.test(trimmedUsername)) return setError("Tài khoản không được có dấu cách.");
        if (trimmedPassword.length < 6) return setError("Mật khẩu phải ít nhất 6 ký tự.");
        if (trimmedPassword.includes(' ')) return setError("Mật khẩu không được chứa khoảng trắng.");

        setIsLoading(true);

        try {
            const emailExists = await accService.isExists(trimmedEmail, trimmedUsername);
            if (emailExists && emailExists.data?.error) {
                setError(emailExists.data.error);
                setIsLoading(false);
                return;
            }

            // Send OTP
            await accService.sendEmailVerifyCode(trimmedEmail);
            setToast({ message: 'Mã OTP đã được gửi đến email của bạn!', type: 'info' });
            setStep('otp');
            setResendTimer(60); // 60 seconds countdown
            setIsLoading(false);

        } catch (err: any) {
            console.error('Register error:', err);
            setError(err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            setIsLoading(false);
        }
    };

    const handleSubmitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!/^\d{6}$/.test(otp)) {
            setError("OTP phải gồm 6 chữ số.");
            return;
        }

        setIsLoading(true);

        // Use trimmed values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        try {
            const ok = await verifyOtp(otp);

            if (!ok) {
                const count = otpErrorCount + 1;
                setOtpErrorCount(count);

                if (count >= 3) {
                    setToast({ message: 'Sai OTP quá 3 lần. Vui lòng đăng ký lại.', type: 'error' });
                    setTimeout(() => {
                        setStep('form');
                        setOtp('');
                        setOtpErrorCount(0);
                    }, 2000);
                    setIsLoading(false);
                    return;
                }

                setError(`OTP sai. Bạn còn ${3 - count} lần thử.`);
                setIsLoading(false);
                return;
            }

            const res = await accService.register({
                name: trimmedName,
                username: trimmedUsername,
                email: trimmedEmail,
                password: trimmedPassword
            });

            // Auto-login after successful registration
            if (res.success && res.data) {
                const userData = res.data.user || res.data;

                // Login the user using AuthContext
                login(userData);

                // Save token if available
                if (res.data.token) {
                    sessionStorage.setItem("Token", res.data.token);
                }

                setToast({ message: `Chào mừng ${userData.full_name || trimmedName}! Đăng ký thành công.`, type: 'success' });
            } else {
                setToast({ message: 'Đăng ký thành công! Đang đăng nhập...', type: 'success' });

                // If no user data returned, create basic user data for login
                const basicUserData = {
                    id: Date.now(), // Temporary ID
                    username: trimmedUsername,
                    email: trimmedEmail,
                    full_name: trimmedName,
                    role: 'student',
                    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${trimmedUsername}`,
                };
                login(basicUserData as any);
            }

            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err: any) {
            console.error('OTP verification error:', err);
            setError(err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        setIsLoading(true);
        try {
            await accService.sendEmailVerifyCode(email);
            setToast({ message: 'Mã OTP mới đã được gửi!', type: 'info' });
            setResendTimer(60);
            setOtpErrorCount(0);
        } catch (err) {
            setToast({ message: 'Không thể gửi lại OTP. Vui lòng thử lại!', type: 'error' });
        }
        setIsLoading(false);
    };

    const inputClass = (hasError: boolean = false) =>
        `mt-1 block w-full rounded-lg border ${hasError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-primary focus:ring-primary'} shadow-sm px-4 py-2.5 focus:ring-2 focus:outline-none transition-colors`;

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {step === 'form' && (
                <form className="space-y-5" onSubmit={handleSubmitRegister}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={name}
                            onChange={(e) => { setName(e.target.value); setError(''); }}
                            className={inputClass()}
                            placeholder="Nhập họ và tên"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            className={inputClass()}
                            placeholder="example@email.com"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Tên đăng nhập <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(''); }}
                            className={inputClass()}
                            placeholder="Ít nhất 4 ký tự, không có dấu cách"
                            disabled={isLoading}
                        />
                        {username && username.length < 4 && (
                            <p className="text-xs text-orange-600 mt-1">Tài khoản phải ít nhất 4 ký tự</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Mật khẩu <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                className={inputClass()}
                                placeholder="Ít nhất 6 ký tự"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-slate-600">Độ mạnh mật khẩu:</span>
                                    <span className="font-medium">{passwordStrength.label}</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div
                                        className={`${passwordStrength.color} h-2 rounded-full transition-all`}
                                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang xử lý...
                            </>
                        ) : (
                            'Đăng ký'
                        )}
                    </button>
                </form>
            )}

            {step === 'otp' && (
                <form className="space-y-5" onSubmit={handleSubmitOtp}>
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <AlertCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Nhập mã OTP</h3>
                        <p className="text-sm text-slate-600 mt-1">Mã xác thực đã được gửi đến <span className="font-medium">{email}</span></p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <div>
                        <input
                            value={otp}
                            onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                            className={inputClass(!!error)}
                            placeholder="Nhập 6 số OTP"
                            maxLength={6}
                            disabled={isLoading}
                        />
                        <p className="text-xs text-slate-500 mt-1">Vui lòng kiểm tra email và nhập mã 6 chữ số</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Đang xác thực...
                            </>
                        ) : (
                            'Xác nhận OTP'
                        )}
                    </button>

                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-sm text-slate-600">
                                Gửi lại mã sau <span className="font-semibold text-primary">{resendTimer}s</span>
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isLoading}
                                className="text-sm text-primary hover:text-primary-hover font-medium disabled:opacity-50"
                            >
                                Gửi lại mã OTP
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => { setStep('form'); setOtp(''); setError(''); }}
                        className="w-full text-sm text-slate-600 hover:text-slate-900 font-medium"
                        disabled={isLoading}
                    >
                        ← Quay lại đăng ký
                    </button>
                </form>
            )}
        </>
    );
};


const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg m-4">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-secondary">MiLearn</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-secondary">Chào mừng trở lại!</h2>
                    <p className="text-slate-500">{isLogin ? 'Đăng nhập để tiếp tục học tập.' : 'Tạo tài khoản để bắt đầu hành trình của bạn.'}</p>
                </div>

                <div className="flex border-b mb-6">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 text-center font-semibold ${isLogin ? 'border-b-2 border-primary text-primary' : 'text-slate-500'}`}
                    >
                        Đăng nhập
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 text-center font-semibold ${!isLogin ? 'border-b-2 border-primary text-primary' : 'text-slate-500'}`}
                    >
                        Đăng ký
                    </button>
                </div>

                {isLogin ? <LoginForm /> : <RegisterForm />}

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-slate-500">Hoặc tiếp tục với</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <SocialButton icon={IoLogoGoogle} provider="Google" />
                    <SocialButton icon={IoLogoFacebook} provider="Facebook" />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
