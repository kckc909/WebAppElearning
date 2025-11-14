import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogoGoogle, IoLogoFacebook } from 'react-icons/io';  
const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const onLoginHandle = () => {
        setIsLogin(true);
    };

    const onRegisterHandle = () => { 
        setIsLogin(false);
    };

    const SocialButton: React.FC<{ icon: React.ComponentType<{ className?: string }>; provider: string; }> = ({ icon: Icon, provider }) => (  
        <button className="flex-1 flex items-center justify-center space-x-2 border border-slate-300 rounded-md py-2.5 hover:bg-slate-50 transition-colors">
            <Icon className="text-xl" /> 
            <span className="font-medium text-slate-600">{provider}</span>
        </button>
    );

    const AuthForm: React.FC = () => (
        <form className="space-y-4">
            {!isLogin && (
                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="name">Họ và tên</label>
                    <input type="text" id="name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="password">Mật khẩu</label>
                <input type="password" id="password" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary" />
            </div>
            {isLogin && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Ghi nhớ tôi</label>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover">Quên mật khẩu?</a>
                </div>
            )}
            <button type="submit" className="w-full bg-primary text-white font-bold py-2.5 rounded-md hover:bg-primary-hover transition-colors">
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </button>
        </form>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg m-4">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex items-center space-x-2 mb-4">
                        <img src="/MiLearnLogo.png" alt="MiLearn Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-secondary">MiLearn</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-secondary">Chào mừng trở lại!</h2>
                    <p className="text-slate-500">
                        {isLogin ? 'Đăng nhập để tiếp tục học tập.' : 'Tạo tài khoản để bắt đầu hành trình của bạn.'}
                    </p>
                </div>

                <div className="flex border-b mb-6">
                    <button onClick={onLoginHandle} className={`flex-1 py-2 text-center font-semibold ${isLogin ? 'border-b-2 border-primary text-primary' : 'text-slate-500'}`}>
                        Đăng nhập
                    </button>
                    <button onClick={onRegisterHandle} className={`flex-1 py-2 text-center font-semibold ${!isLogin ? 'border-b-2 border-primary text-primary' : 'text-slate-500'}`}>
                        Đăng ký
                    </button>
                </div>

                <AuthForm />

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
