import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io';
import { accService } from '../../API/accounts.api';

const SocialButton: React.FC<{ icon: React.ComponentType<{ className?: string }>; provider: string }> = ({
    icon: Icon,
    provider,
}) => (
    <button
        type="button"
        className="flex-1 flex items-center justify-center space-x-2 border border-slate-300 rounded-md py-2.5 hover:bg-slate-50 transition-colors"
    >
        <Icon className="text-xl" />
        <span className="font-medium text-slate-600">{provider}</span>
    </button>
);

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const accFound = await accService.login(username, password);

        if (!accFound) {
            setError("Sai username hoặc mật khẩu.");
            return;
        }

        alert('Chào mừng ' + accFound.data.full_name);
        navigate('/');
    };

    const inputClass =
        "mt-1 block w-full rounded-md border border-slate-300 shadow-sm p-2 focus:border-primary focus:ring-primary";

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
                <label className="text-sm font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass}
                />
            </div>

            <div>
                <label className="text-sm font-medium">Mật khẩu</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-md font-semibold hover:bg-primary-hover"
            >
                Đăng nhập
            </button>
        </form>
    );
};

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'otp'>('form');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpErrorCount, setOtpErrorCount] = useState(0);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const verifyOtp = async (otpCode: string) => {
        return otpCode === otp;
    };

    const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // check
        if (!name.trim()) return setError("Họ tên không được để trống.");
        if (!emailRegex.test(email)) return setError("Email không hợp lệ.");
        if (username.length < 4) return setError("Username phải ít nhất 4 ký tự.");
        if (/\s/.test(username)) return setError("Username không được có dấu cách.");
        if (password.length < 6) return setError("Mật khẩu phải ít nhất 6 ký tự.");

        const emailExists = await accService.isExists(email, username);
        if (emailExists) return setError(emailExists.data.error);

        // otp
        console.log('Sending viertify code')
        await accService.sendEmailVertifyCode(email);
        console.log('Sended viertify code')

        setStep('otp');
    };

    const handleSubmitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!/^\d{6}$/.test(otp)) {
            setError("OTP phải gồm 6 chữ số.");
            return;
        }

        const ok = await verifyOtp(otp);

        if (!ok) {
            const count = otpErrorCount + 1;
            setOtpErrorCount(count);

            if (count >= 3) {
                alert("Sai OTP quá 3 lần. Vui lòng đăng ký lại.");
                setStep('form');
                setOtp('');
                setOtpErrorCount(0);
                return;
            }

            setError(`OTP sai. Bạn còn ${3 - count} lần thử.`);
            return;
        }

        const res = await accService.register({ name, username, email, password });
        console.log(res)
        alert("Đăng ký thành công!");
        navigate('/');
    };

    const inputClass =
        "mt-1 block w-full rounded-md border border-slate-200 shadow-sm p-2 focus:border-primary";

    return (
        <>
            {step === 'form' && (
                <form className="space-y-4" onSubmit={handleSubmitRegister}>

                    <div>
                        <label className="text-sm font-medium">Họ và tên</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button className="w-full bg-primary text-white py-2.5 rounded-md">
                        Đăng ký
                    </button>

                </form>
            )}

            {step === 'otp' && (
                <form className="space-y-4" onSubmit={handleSubmitOtp}>
                    <h3 className="text-lg font-semibold text-center">Nhập mã OTP</h3>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={inputClass}
                        placeholder="Nhập 6 số OTP"
                    />

                    <button className="w-full bg-primary text-white py-2.5 rounded-md">Xác nhận OTP</button>
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
