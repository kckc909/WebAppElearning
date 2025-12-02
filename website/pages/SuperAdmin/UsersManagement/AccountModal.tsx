import React, { useState, useEffect, useCallback } from 'react';
import { Accounts } from '../../../types/types';
import { X, Edit2, Plus } from 'lucide-react';

export interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Accounts) => void;
    initialData?: Accounts;
    title: string;
}

const defaultFormData: Accounts = {
    id: 0,
    full_name: '',
    email: '',
    role: 2,
    status: 1,
    password_hash: ''
};

const AccountModal: React.FC<AccountModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title
}) => {
    const [formData, setFormData] = useState<Accounts>(defaultFormData);
    const [isDirty, setIsDirty] = useState(false);

    // Initialize form data when modal opens or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData(defaultFormData);
            }
            setIsDirty(false);
        }
    }, [isOpen, initialData]);

    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsDirty(true);
    };

    // Safe Close with Confirmation
    const handleSafeClose = useCallback(() => {
        if (isDirty) {
            const confirmClose = window.confirm("You have unsaved changes. Are you sure you want to close?");
            if (confirmClose) {
                onClose();
            }
        } else {
            onClose();
        }
    }, [isDirty, onClose]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                handleSafeClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleSafeClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setIsDirty(false); // Reset dirty state after submit
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
                    <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                        onClick={handleSafeClose}
                    >
                        <span className="sr-only">Close</span>
                        <X size={24} />
                    </button>
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                        {initialData ? <Edit2 className="h-6 w-6 text-brand-600" /> : <Plus className="h-6 w-6 text-brand-600" />}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                        </h3>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Full Name</label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Email Address</label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 text-left">Role</label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={Number(formData.role)}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value={0} >Admin</option>
                                            <option value={1}>Instructor</option>
                                            <option value={2}>Student</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900 text-left">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={Number(formData.status)}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value={0}>Active</option>
                                            <option value={1}>Inactive</option>
                                            <option value={2}>Pending</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:col-start-2 bg-primary"
                                    >
                                        {initialData ? 'Save Changes' : 'Create User'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        onClick={handleSafeClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;
