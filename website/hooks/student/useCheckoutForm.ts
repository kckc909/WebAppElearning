import { useState } from 'react';

// Types
export interface BillingInfo {
    fullName: string;
    email: string;
    phone: string;
}

export interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
}

export const useCheckoutForm = () => {
    const [billingInfo, setBillingInfo] = useState<BillingInfo>(() => {
        try {
            const accountData = sessionStorage.getItem('Account');
            if (accountData) {
                const account = JSON.parse(accountData);
                return {
                    fullName: account.full_name || account.fullName || account.name || '',
                    email: account.email || '',
                    phone: account.phone || account.phone_number || '',
                };
            }
        } catch (e) {
            console.log('Error reading Account from localStorage');
        }
        return { fullName: '', email: '', phone: '' };
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string) => {
        const re = /^(\+84|84|0)[0-9]{9,10}$/;
        return re.test(phone.replace(/\s/g, ''));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!billingInfo.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ tên';
        } else if (billingInfo.fullName.trim().length < 2) {
            newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
        }

        if (!billingInfo.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!validateEmail(billingInfo.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!billingInfo.phone.trim()) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!validatePhone(billingInfo.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateField = (field: keyof BillingInfo, value: string) => {
        setBillingInfo(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return {
        billingInfo,
        errors,
        updateField,
        validateForm
    };
};
