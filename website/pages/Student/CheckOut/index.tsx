import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trash2, Tag, ShieldCheck, ArrowRight, CheckCircle2, X, QrCode, Star, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface CartItem {
    id: number;
    title: string;
    instructor?: {
        full_name: string;
    };
    thumbnail: string;
    price: number;
    discount_price: number;
    rating?: number;
    total_students?: number;
    total_duration?: number;
}

// QR Payment Dialog Component
const QRPaymentDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: number;
}> = ({ isOpen, onClose, onSuccess, amount }) => {
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
                                <span className="font-semibold">Vietcombank</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Số tài khoản:</span>
                                <span className="font-semibold">1234 5678 90</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Chủ tài khoản:</span>
                                <span className="font-semibold">CONG TY MILEARN</span>
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

const StudentCheckout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get courses from navigation state or use mock data
    const initialCourses = location.state?.courses || [
        {
            id: 1,
            title: 'Complete Web Development Bootcamp 2024',
            instructor: { full_name: 'Nguyễn Văn A' },
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
            price: 1990000,
            discount_price: 990000,
            rating: 4.8,
            total_students: 12543,
            total_duration: 3240
        }
    ];

    const [cartItems, setCartItems] = useState<CartItem[]>(initialCourses);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'zalopay' | 'bank'>('bank');
    const [showQRDialog, setShowQRDialog] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Form errors
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        phone?: string;
    }>({});

    // Initialize billing info from localStorage if user is logged in
    const [billingInfo, setBillingInfo] = useState(() => {
        try {
            const accountData = localStorage.getItem('Account');
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
        return {
            fullName: '',
            email: '',
            phone: '',
        };
    });

    const subtotal = cartItems.reduce((sum, item) => sum + item.discount_price, 0);
    const discount = appliedPromo ? appliedPromo.discount : 0;
    const total = subtotal - discount;

    // Validate email format
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Validate phone format (Vietnamese phone)
    const validatePhone = (phone: string) => {
        const re = /^(\+84|84|0)[0-9]{9,10}$/;
        return re.test(phone.replace(/\s/g, ''));
    };

    // Validate form
    const validateForm = () => {
        const newErrors: typeof errors = {};

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

    const handleApplyPromo = () => {
        if (promoCode === 'SAVE50K') {
            setAppliedPromo({ code: promoCode, discount: 50000 });
            toast.success('Áp dụng mã giảm giá thành công!');
        } else {
            toast.error('Mã giảm giá không hợp lệ!');
        }
    };

    const handleRemovePromo = () => {
        setAppliedPromo(null);
        setPromoCode('');
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
        toast.success('Đã xóa khóa học khỏi giỏ hàng');
    };

    const handleCheckout = () => {
        // Reset errors
        setErrors({});

        // Validate form
        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin thanh toán!');
            return;
        }

        if (!agreeTerms) {
            toast.error('Vui lòng đồng ý với điều khoản và điều kiện!');
            return;
        }

        // Show different flows based on payment method
        if (paymentMethod === 'bank') {
            setShowQRDialog(true);
        } else {
            toast.error('Phương thức thanh toán này chưa khả dụng!');
        }
    };

    const handlePaymentSuccess = () => {
        setShowQRDialog(false);

        // Show success toast
        toast.success('Thanh toán thành công! Chúc mừng bạn đã đăng ký khóa học.', {
            duration: 4000,
            icon: '🎉'
        });

        // Redirect to first course detail page after a short delay
        setTimeout(() => {
            if (cartItems.length > 0) {
                navigate(`/courses/${cartItems[0].id}`);
            } else {
                navigate('/my-courses');
            }
        }, 2000);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        return `${hours}h`;
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-secondary mb-2">Giỏ hàng trống</h2>
                    <p className="text-slate-600 mb-6">Bạn chưa có khóa học nào trong giỏ hàng</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold"
                    >
                        Khám phá khóa học
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-secondary">Thanh toán</h1>
                <p className="text-slate-600 mt-1">Hoàn tất đơn hàng của bạn</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Cart & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cart Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">Khóa học ({cartItems.length})</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-900 line-clamp-2 mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-600 mb-2">
                                            Giảng viên: {item.instructor?.full_name || 'N/A'}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                                            {item.rating && (
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span>{item.rating}</span>
                                                </div>
                                            )}
                                            {item.total_students && (
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span>{item.total_students.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {item.total_duration && (
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatDuration(item.total_duration)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-primary">{formatCurrency(item.discount_price)}</span>
                                            <span className="text-sm text-slate-400 line-through">{formatCurrency(item.price)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-500 hover:text-red-700 p-2 h-fit"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">Thông tin thanh toán</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={billingInfo.fullName}
                                    onChange={(e) => {
                                        setBillingInfo({ ...billingInfo, fullName: e.target.value });
                                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                                    }}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                                        }`}
                                    placeholder="Nguyễn Văn A"
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={billingInfo.email}
                                    onChange={(e) => {
                                        setBillingInfo({ ...billingInfo, email: e.target.value });
                                        if (errors.email) setErrors({ ...errors, email: undefined });
                                    }}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                                        }`}
                                    placeholder="email@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Số điện thoại <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={billingInfo.phone}
                                    onChange={(e) => {
                                        setBillingInfo({ ...billingInfo, phone: e.target.value });
                                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                                    }}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300'
                                        }`}
                                    placeholder="0912 345 678"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-xl font-bold text-secondary mb-4">Phương thức thanh toán</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                            {[
                                { id: 'bank', label: 'Chuyển khoản', icon: '🏦', enabled: true },
                                { id: 'card', label: 'Thẻ tín dụng', icon: '💳', enabled: false },
                                { id: 'momo', label: 'MoMo', icon: '🟣', enabled: false },
                                { id: 'zalopay', label: 'ZaloPay', icon: '🔵', enabled: false },
                            ].map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => method.enabled && setPaymentMethod(method.id as any)}
                                    disabled={!method.enabled}
                                    className={`p-4 rounded-lg border-2 transition-all relative ${paymentMethod === method.id
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

                        {paymentMethod === 'bank' && (
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                <div className="flex items-start gap-3 mb-4">
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
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-6">
                    {/* Promo Code */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h3 className="font-bold text-secondary mb-4 flex items-center">
                            <Tag className="w-5 h-5 mr-2" />
                            Mã giảm giá
                        </h3>
                        {!appliedPromo ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Nhập mã"
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="font-medium text-green-700">{appliedPromo.code}</span>
                                </div>
                                <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700">
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
                            {appliedPromo && (
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
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
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
                            onClick={handleCheckout}
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
            </div>

            {/* QR Payment Dialog */}
            <QRPaymentDialog
                isOpen={showQRDialog}
                onClose={() => setShowQRDialog(false)}
                onSuccess={handlePaymentSuccess}
                amount={total}
            />
        </div>
    );
};

export default StudentCheckout;