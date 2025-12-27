import React, { useState } from 'react';
import { Tag, CheckCircle2, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { PromoCode } from '../../../../hooks/student/usePromoCode';

interface OrderSummaryProps {
    subtotal: number;
    discount: number;
    total: number;
    itemCount: number;
    promoCode: PromoCode | null;
    onApplyPromo: (code: string) => void;
    onRemovePromo: () => void;
    agreeTerms: boolean;
    onAgreeTermsChange: (agree: boolean) => void;
    onCheckout: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ 
    subtotal, 
    discount, 
    total, 
    itemCount,
    promoCode,
    onApplyPromo,
    onRemovePromo,
    agreeTerms,
    onAgreeTermsChange,
    onCheckout
}) => {
    const [code, setCode] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handleApply = () => {
        if (code.trim()) {
            onApplyPromo(code.trim());
        }
    };

    return (
        <div className="space-y-6">
            {/* Promo Code */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-secondary mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Mã giảm giá
                </h3>
                {!promoCode ? (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="Nhập mã"
                        />
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                        >
                            Áp dụng
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                            <span className="font-medium text-green-700">{promoCode.code}</span>
                        </div>
                        <button onClick={onRemovePromo} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
                <h3 className="font-bold text-secondary mb-4">Tổng đơn hàng</h3>
                <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-slate-700">
                        <span>Tạm tính</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Giảm giá</span>
                            <span>-{formatCurrency(discount)}</span>
                        </div>
                    )}
                    <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-secondary">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="flex items-start cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => onAgreeTermsChange(e.target.checked)}
                            className="mt-1 mr-2"
                        />
                        <span className="text-sm text-slate-600">
                            Tôi đồng ý với{' '}
                            <a href="#" className="text-primary hover:underline">
                                điều khoản và điều kiện
                            </a>
                        </span>
                    </label>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold flex items-center justify-center"
                >
                    Tiếp tục
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                <div className="mt-4 flex items-center justify-center text-sm text-slate-500">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Thanh toán an toàn và bảo mật
                </div>
            </div>
        </div>
    );
};
