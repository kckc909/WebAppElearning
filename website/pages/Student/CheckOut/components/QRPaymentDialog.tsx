import React from 'react';
import { X, QrCode, CheckCircle2 } from 'lucide-react';
import { QRPaymentDialogProps } from '../types';

export const QRPaymentDialog: React.FC<QRPaymentDialogProps> = ({ 
    isOpen, 
    onClose, 
    onSuccess, 
    amount 
}) => {
    if (!isOpen) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
                {/* Header */}
                <div className="border-b border-slate-200 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-secondary">Quét mã QR để thanh toán</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                    <div className="mb-6">
                        <p className="text-slate-600 mb-2">Số tiền thanh toán:</p>
                        <p className="text-3xl font-bold text-primary">{formatPrice(amount)}</p>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white border-4 border-slate-200 rounded-2xl p-8 mb-6 inline-block">
                        <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <QrCode className="w-48 h-48 text-primary/30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                                    <p className="text-sm font-semibold text-primary">Chuyển khoản thành công!</p>
                                    <p className="text-xs text-slate-600 mt-1">(Demo QR Code)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm font-semibold text-slate-700 mb-3">Thông tin chuyển khoản:</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Ngân hàng:</span>
                                <span className="font-semibold">Viettinbank</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Số tài khoản:</span>
                                <span className="font-semibold">0934206983</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Chủ tài khoản:</span>
                                <span className="font-semibold">CHU DUC MINH</span>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-blue-900 font-semibold mb-2">📱 Hướng dẫn:</p>
                        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                            <li>Mở ứng dụng ngân hàng của bạn</li>
                            <li>Quét mã QR bên trên</li>
                            <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                            <li>Nhấn "Xác nhận" bên dưới sau khi chuyển khoản thành công</li>
                        </ol>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onSuccess}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        Tôi đã chuyển khoản
                    </button>
                </div>
            </div>
        </div>
    );
};
