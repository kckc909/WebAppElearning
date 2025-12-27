import React from 'react';
import { BillingInfo, FormErrors } from '../../../../hooks/student/useCheckoutForm';

interface BillingFormProps {
    billingInfo: BillingInfo;
    errors: FormErrors;
    onChange: (field: keyof BillingInfo, value: string) => void;
}

export const BillingForm: React.FC<BillingFormProps> = ({ 
    billingInfo, 
    errors, 
    onChange 
}) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={billingInfo.fullName}
                    onChange={(e) => onChange('fullName', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Nguyễn Văn A"
                />
                {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => onChange('email', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="email@example.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="0912 345 678"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
            </div>
        </div>
    );
};
