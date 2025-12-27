import React from 'react';
import { QrCode } from 'lucide-react';
import { PaymentMethod } from '../../../../hooks/student/useCheckoutFlow';

interface PaymentMethodSelectorProps {
    selectedMethod: PaymentMethod;
    onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
    selectedMethod, 
    onSelect 
}) => {
    const methods = [
        { id: 'bank', label: 'Chuyển khoản', icon: '🏦', enabled: true },
        { id: 'card', label: 'Thẻ tín dụng', icon: '💳', enabled: false },
        { id: 'momo', label: 'MoMo', icon: '🟣', enabled: false },
        { id: 'zalopay', label: 'ZaloPay', icon: '🔵', enabled: false },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold text-secondary mb-4">Phương thức thanh toán</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {methods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => method.enabled && onSelect(method.id as PaymentMethod)}
                        disabled={!method.enabled}
                        className={`p-4 rounded-lg border-2 transition-all relative ${
                            selectedMethod === method.id
                                ? 'border-primary bg-blue-50'
                                : method.enabled
                                ? 'border-slate-200 hover:border-slate-300'
                                : 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        }`}
                    >
                        {!method.enabled && (
                            <div className="absolute top-1 right-1 bg-slate-500 text-white text-xs px-2 py-0.5 rounded">
                                Soon
                            </div>
                        )}
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-sm font-medium">{method.label}</div>
                    </button>
                ))}
            </div>

            {selectedMethod === 'bank' && (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                        <QrCode className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-secondary mb-2">Thanh toán bằng chuyển khoản</h3>
                            <p className="text-sm text-slate-600">
                                Sau khi nhấn "Tiếp tục", bạn sẽ được hiển thị mã QR để quét và chuyển khoản.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
