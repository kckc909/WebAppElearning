import React, { useState, useEffect, useCallback } from 'react';
import { X, Edit2, Plus, EyeOff, Eye } from 'lucide-react';
import { Account } from '../../../API/interfaces/IAccountsApi';

export interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Account) => void;
    initialData?: Account;
    title: string;
}

const defaultFormData: Account = {
    id: 0,
    full_name: '',
    email: '',
    username: '',
    password_hash: '',
    role: 'STUDENT',
    status: 0,
};

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onSubmit, initialData, title }) => {
    const [formData, setFormData] = useState<Account>(defaultFormData);
    const [isDirty, setIsDirty] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (isOpen) {
            setFormData(initialData ?? defaultFormData);
            setIsDirty(false);
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'status' ? Number(value) : value
        }));
        setIsDirty(true);
    };

    const handleSafeClose = useCallback(() => {
        if (isDirty && !window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn đóng?')) return;
        onClose();
    }, [isDirty, onClose]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) handleSafeClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleSafeClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setIsDirty(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                onClick={handleSafeClose}
            />
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 animate-fade-in-up">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500" onClick={handleSafeClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                        {initialData ? <Edit2 className="h-6 w-6 text-brand-600" /> : <Plus className="h-6 w-6 text-brand-600" />}
                    </div>

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-900">Họ tên</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-900">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="password_hash" className="block text-sm font-medium text-gray-900">Mật khẩu</label>
                                <div className="relative mt-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password_hash"
                                        name="password_hash"
                                        value={formData.password_hash}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                        placeholder={initialData ? 'Để trống nếu giữ mật khẩu hiện tại' : ''}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-900">Vai trò</label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role ?? 'STUDENT'}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                    >
                                        <option value="SUPER_ADMIN">Quản trị viên cao cấp</option>
                                        <option value="ADMIN">Quản trị viên</option>
                                        <option value="INSTRUCTOR">Giảng viên</option>
                                        <option value="STUDENT">Học viên</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-900">Trạng thái</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status as number}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-brand-600 sm:text-sm"
                                    >
                                        <option value={0}>Hoạt động</option>
                                        <option value={1}>Không hoạt động</option>
                                        <option value={2}>Đang chờ</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:col-start-2"
                                >
                                    {initialData ? 'Lưu thay đổi' : 'Tạo người dùng'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                    onClick={handleSafeClose}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;
